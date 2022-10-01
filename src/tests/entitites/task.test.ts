import { Task } from "../../entities";

describe("Testing task entity", () => {
    it("Should return the right object with the correct data", () =>{
        const expectedKeys = [
            "name",
            "timeDay",
            "labels",
            "userId",
            "recurrence",
            "taskNotes",
            "createdAt",
            "deletedAt"
        ]

        const receivedKeys = Object.keys(
            new Task(
                '',
                new Date().toDateString(),
                [],
                '0a1sd23f4w8e',
                '',
                ''
            )
        )
    
        expect(expectedKeys).toStrictEqual(receivedKeys)
    })
})