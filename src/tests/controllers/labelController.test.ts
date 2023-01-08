import { config } from 'dotenv';
import { ObjectId } from 'mongodb';

config()

import supertest from 'supertest';
import app from '../../app';
import { client } from '../../database/db';
import { Label } from '../../entities';

describe("Testing labelController methods", () => {
    let createdLabelId = '';

    describe("Testing storeLabel method", () => {
        it("Should return an error if a required field is not provided", async() => {
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

        it("Should correctly create a label", async() => {
            const res = await supertest(app)
            .post("/labels")
            .send({
                name: "Home tasks"
            })
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty("id")
            expect(res.body).toHaveProperty("message")
            expect(res.body.message).toBe("Label created.")

            createdLabelId = res.body.id
        })
    })

    describe("Testng showLabel method", () => {
        it("If _id quqery parameter is provided, should validate", async() => {
            const res = await supertest(app)
            .get("/labels?_id=asdf")
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedResponseBody = {
                error: "Invalid ID format."
            }

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual(expectedResponseBody)
        })

        it("Should query correctly by the query parameter name if provided", async() => {
            const res = await supertest(app)
            .get("/labels?name=home")
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedResponseBody = {
                result: [
                    {
                        _id: createdLabelId,
                        name: "Home tasks",
                        userId: "6345cc0864b8658185372db0",
                        deletedAt: null
                    }
                ]
            }

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject(expectedResponseBody)
        })

        it("Should correctly query all registered labels", async() => {
            const res = await supertest(app)
            .get("/labels")
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedResponseBody = {
                result: [
                    {
                        _id: createdLabelId,
                        name: "Home tasks",
                        userId: "6345cc0864b8658185372db0",
                        deletedAt: null
                    }
                ]
            }

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject(expectedResponseBody)
        })

        it("Should return status 404 if no data is found", async() => {
            const res = await supertest(app)
            .get("/labels?name=asdf")
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedResponseBody = {
                error: "No data found."
            }

            expect(res.status).toBe(404)
            expect(res.body).toStrictEqual(expectedResponseBody)
        })
    })

    describe("Testing updateLabel method", () => {
        it("Should validate if provided labelId is valid", async() => {
            const res = await supertest(app)
            .put(`/labels/asdf`)
            .send({})
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedResponseBody = {
                error: "Invalid ID format."
            }

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual(expectedResponseBody)
        })

        it("Should return status 404 if no label is found", async() => {
            const res = await supertest(app)
            .put(`/labels/634ef580722c9985b7e67c17`)
            .send({})
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedResponseBody = {
                error: "Label not found."
            }

            expect(res.status).toBe(404)
            expect(res.body).toStrictEqual(expectedResponseBody)
        })

        it("Should properly update label if all goes right", async() => {
            const res = await supertest(app)
            .put(`/labels/${createdLabelId}`)
            .send({
                name: "Home tasks updated"
            })
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedResponseBody = {
                message: "Label updated."
            }

            expect(res.status).toBe(200)
            expect(res.body).toStrictEqual(expectedResponseBody)

            const updatedLabel = await client.collection("labels").findOne<Label>({_id: new ObjectId(createdLabelId)})

            expect(updatedLabel!.name).toBe("Home tasks updated")
        })
    })

    describe("Testing deleteLabel method", () => {
        it("Should validate if provided id is valid", async() => {
            const res = await supertest(app)
            .delete(`/labels/asdf`)
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedResponseBody = {
                error: "Invalid ID format."
            }

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual(expectedResponseBody)
        })

        it("Should properly delete label if all goes right", async() => {
            const res = await supertest(app)
            .delete(`/labels/${createdLabelId}`)
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            expect(res.status).toBe(204)

            const deletedLabel = await client.collection("labels").findOne({_id: new ObjectId(createdLabelId)})

            expect(deletedLabel).toBe(null)
        })
    })
})