import { Task } from "../../entities";

describe("Testing task entity", () => {
    it("Should return the right object with the correct data", () =>{
        const expectedKeys = [
            "name",
            "recurrenceType",
            "recurrenceValue",
            "hour",
            "labels",
            "userId",
            "taskNotes",
            "createdAt",
            "deletedAt"
        ]

        const receivedKeys = Object.keys(
            new Task(
                '',
                0,
                'EM',
                12,
                [],
                '0a1sd23f4w8e',
                '',
            )
        )
    
        expect(expectedKeys).toStrictEqual(receivedKeys)
    })
})