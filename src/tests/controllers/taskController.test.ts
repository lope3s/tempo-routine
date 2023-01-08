import { config } from 'dotenv';
import { ObjectId } from 'mongodb';

config()

import supertest from 'supertest';
import app from '../../app';
import { client } from '../../database/db';

describe("Testing task controller methods", () => {
    let createdTaskId = '';

    describe("Testing storeTas method", () => {
        it("Should return a validation error if the userId is invalid", async() => {
            const res = await supertest(app)
            .post('/tasks')
            .send({
                name: "test",
                recurrenceType: 0,
                recurrenceValue: "EM",
                hour: 23,
                labels: [
                  "6345cc0864b8658185372dbasdfsdfsadfasdfasdf0"
                ],
                taskNotes: "A very extense text."
            })
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )
    
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("error")
            expect(res.body.error).toBe("Invalid ID format.")
        })
    
        it("Should return a server error if anything unexpected happens", async() => {
            const res = await supertest(app)
            .post('/tasks')
            .send({
                name: "test",
                recurrenceType: "sdfgsdfg",
                recurrenceValue: "EM",
                hour: 23,
                labels: "6345cc0864b8658185372db0",
                taskNotes: "A very extense text."
            })
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )
    
            expect(res.status).toBe(500)
            expect(res.body).toHaveProperty("error")
            expect(res.body.error).toBe("Internal Server Error.")
        })
    
        it("Should return a validation error if there are fields missing", async() => {
            const res = await supertest(app)
            .post('/tasks')
            .send({
                recurrenceType: 0,
                recurrenceValue: "EM",
                hour: 23,
                labels: [
                  "6345cc0864b8658185372db0"
                ],
                taskNotes: "A very extense text."
            })
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )
    
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("error")
            expect(res.body).toHaveProperty("missingField")
            expect(res.body.missingField).toStrictEqual(["name"])
        })
    
        it("Should create a task correctly", async() => {
            const res = await supertest(app)
            .post('/tasks')
            .send({
                name: "Tidy the bed",
                recurrenceType: 0,
                recurrenceValue: "EM",
                hour: 23,
                labels: [
                  "6345cc0864b8658185372db0"
                ],
                taskNotes: "A very extense text."
            })
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )
    
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty("message")
            expect(res.body).toHaveProperty("id")
    
            createdTaskId = res.body.id
        })
    })

    describe("Testing updateTask method", () => {
        it("Should return an error if task id is invalid", async() => {
            const res = await supertest(app)
            .put(`/tasks/asdf`)
            .send({
                name: "New tidy the bed"
            })
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

        it("Should return status 404 if the provided task id was not found", async() => {
            const res = await supertest(app)
            .put(`/tasks/${createdTaskId.replace('6', '7')}`)
            .send({
                name: "New tidy the bed"
            })
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )
    
            const expectedResponseBody = {
                error: "Task not found."
            }
    
            expect(res.status).toBe(404)
            expect(res.body).toStrictEqual(expectedResponseBody)
        })

        it("Should update created task", async() => {
            const res = await supertest(app)
            .put(`/tasks/${createdTaskId}`)
            .send({
                name: "New tidy the bed"
            })
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )
    
            const expectedResponseBody = {
                message: "Task updated."
            }
    
            expect(res.status).toBe(200)
            expect(res.body).toStrictEqual(expectedResponseBody)

            const updatedTask = await client.collection("tasks").findOne({_id: new ObjectId(createdTaskId)})

            expect(updatedTask!.name).toBe("New tidy the bed")
        })
    })

    describe("Testing showTask method", () => {
        it("If query _id is provided, should validate if the id is valid", async() => {
            const res = await supertest(app)
            .get('/tasks?_id=new')
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedBodyResponse = {
                error: "Invalid ID format."
            }
            
            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual(expectedBodyResponse)
        })

        it("Should return status 404 if no data is found", async() => {
            const res = await supertest(app)
            .get('/tasks?name=asdf')
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedBodyResponse = {
                error: 'No data found.'
            }
            
            expect(res.status).toBe(404)
            expect(res.body).toStrictEqual(expectedBodyResponse)
        })

        it("Should correctly query task by name", async() => {
            const res = await supertest(app)
            .get('/tasks?name=new')
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )
    
            const expectedReturnValue = {
                "result": [
                    {
                        _id: createdTaskId,
                        name: "New tidy the bed",
                        recurrenceType: 0,
                        recurrenceValue: "EM",
                        hour: 23,
                        labels: [
                            "6345cc0864b8658185372db0"
                        ],
                        userId: "6345cc0864b8658185372db0",
                        taskNotes: "A very extense text.",
                        deletedAt: null
                    }
                ]
            }
    
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject(expectedReturnValue)
        })

        it("Should list all tasks", async() => {
            const res = await supertest(app)
            .get('/tasks')
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )
    
            const expectedReturnValue = {
                "result": [
                    {
                        _id: createdTaskId,
                        name: "New tidy the bed",
                        recurrenceType: 0,
                        recurrenceValue: "EM",
                        hour: 23,
                        labels: [
                            "6345cc0864b8658185372db0"
                        ],
                        userId: "6345cc0864b8658185372db0",
                        taskNotes: "A very extense text.",
                        deletedAt: null
                    }
                ]
            }
    
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject(expectedReturnValue)
        })
    })

    describe("Testing deleteTask method", () => {
        it("Should return status 400 if the provided taskId is invalid", async() => {
            const res = await supertest(app)
            .delete(`/tasks/asdf`)
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )

            const expectedBodyResponse = {
                error: "Invalid ID format."
            }
    
            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual(expectedBodyResponse)
        })

        it("Should delete the created task", async() => {
            const res = await supertest(app)
            .delete(`/tasks/${createdTaskId}`)
            .set(
                "Authorization", 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjYzA4NjRiODY1ODE4NTM3MmRiMCIsImlhdCI6MTY2NTY5ODAyMH0.uXf2pvi7ygYYpxKdczo-S7w3vTowzBy48o00o7EGOv4"
            )
    
            expect(res.status).toBe(204)
    
            const createdtask = await client.collection("tasks").findOne({_id: new ObjectId(createdTaskId)})
    
            expect(createdtask).toBe(null)
        })
    })
})