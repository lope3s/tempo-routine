import { config } from 'dotenv';

config()

import supertest from 'supertest';
import app from '../../app';

describe("Testing authorization middleware", () => {
    it("Should return a status 401 if no token is provided", async() => {
        const res = await supertest(app)
        .post("/labels")
        .send({})

        const expectedResponseBody = {
            error: "No token provided."
        }

        expect(res.status).toBe(401)
        expect(res.body).toStrictEqual(expectedResponseBody)
    })

    it("Should return a status 401 if the token is not valid", async() => {
        const res = await supertest(app)
        .post("/labels")
        .send({})
        .set(
            "Authorization", 
            "Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
        )

        const expectedResponseBody = {
            error: "Invalid Token."
        }

        expect(res.status).toBe(401)
        expect(res.body).toStrictEqual(expectedResponseBody)
    })

    it("Should return the controller error meaning that the authorization field was ok", async() => {
        const res = await supertest(app)
        .post("/labels")
        .send({})
        .set(
            "Authorization", 
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
        )

        const expectedResponseBody = {
            error: "The following fields are missing",
            missingFields: ["name"] 
        }

        expect(res.status).toBe(400)
        expect(res.body).toStrictEqual(expectedResponseBody)
    })
})