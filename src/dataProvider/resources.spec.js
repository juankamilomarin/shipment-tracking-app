import { getResourceProperties } from './resources'
import { COURIER } from './resources'
import { PROPERTIES as COURIER_PROPERTIES } from '../couriers/resource'

describe("getResourceProperties", () => {

    it("should return expected properties for currency", () => {
        const actualResponse = getResourceProperties(COURIER)
        expect(actualResponse).toStrictEqual(COURIER_PROPERTIES)
    });

    it("should throw error for unvalid resource", () => {
        const invalidResource = 'invalid-resource'
        expect(() => getResourceProperties(invalidResource)).toThrow(`Unsupported resource ${invalidResource}`)        
    });

});