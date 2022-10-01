import { Strike } from "../../entities";

describe('Testing strike entity', () => {
    it('Should return the correct object with the correct data', () => {
        const expectedKeys = [
            'userId',
            'taskId',
            'startDate',
            'endDate',
            'createdAt',
            'deletedAt'
        ]

        const received = Object.keys(
            new Strike(
                '0a1sd23f4w8e', 
                '0a1sd23f4w8e', 
                new Date().toDateString(), 
                new Date().toDateString()
            )
        )

        expect(expectedKeys).toStrictEqual(received)
    })
})