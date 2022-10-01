import {Label} from '../../entities'

describe("Testing Label entity", () => {
    it('Should return the right object with the correct data', () => {
        const expectedKeys = [
            "name",
            "userId",
            "createdAt",
            "deletedAt"
        ]

        const received = Object.keys(new Label('', '0a1sd23f4w8e'))

        expect(expectedKeys).toStrictEqual(received)
    })
})