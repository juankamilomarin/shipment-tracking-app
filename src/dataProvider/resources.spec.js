import { getResourceProperties } from './resources'
import { COURIER, STORE } from './resources'
import { RESOURCE_PROPERTIES as COURIER_PROPERTIES } from '../couriers'
import { RESOURCE_PROPERTIES as STORE_PROPERTIES } from '../stores'

describe("getResourceProperties", () => {

    it("should return expected properties for courier", () => {
        const actualResponse = getResourceProperties(COURIER)
        expect(actualResponse).toStrictEqual(COURIER_PROPERTIES)
    });

    it("should return expected properties for store", () => {
        const actualResponse = getResourceProperties(STORE)
        expect(actualResponse).toStrictEqual(STORE_PROPERTIES)
    });

    it("should throw error for unvalid resource", () => {
        const invalidResource = 'invalid-resource'
        expect(() => getResourceProperties(invalidResource)).toThrow(`Unsupported resource ${invalidResource}`)        
    });

});