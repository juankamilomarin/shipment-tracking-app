import { getResourceProperties, getGraphQLResource } from './resources'
import { COURIER, STORE, PARCEL, ORDER } from './resources'
import { RESOURCE_PROPERTIES as COURIER_PROPERTIES } from '../couriers'
import { RESOURCE_PROPERTIES as STORE_PROPERTIES } from '../stores'
import { RESOURCE_PROPERTIES as PARCEL_PROPERTIES } from '../parcels'
import { RESOURCE_PROPERTIES as ORDER_PROPERTIES } from '../orders'

describe("getResourceProperties", () => {

    it("should return properties for courier", () => {
        const actualResponse = getResourceProperties(COURIER)
        expect(actualResponse).toStrictEqual(COURIER_PROPERTIES)
    });

    it("should return properties for store", () => {
        const actualResponse = getResourceProperties(STORE)
        expect(actualResponse).toStrictEqual(STORE_PROPERTIES)
    });

    it("should return properties for parcel", () => {
        const actualResponse = getResourceProperties(PARCEL)
        expect(actualResponse).toStrictEqual(PARCEL_PROPERTIES)
    });

    it("should return properties for order", () => {
        const actualResponse = getResourceProperties(ORDER)
        expect(actualResponse).toStrictEqual(ORDER_PROPERTIES)
    });

    it("should throw error for unvalid resource", () => {
        const invalidResource = 'invalid-resource'
        expect(() => getResourceProperties(invalidResource)).toThrow(`Unsupported resource ${invalidResource}`)        
    });

});

describe("getGraphQLResource", () => {

    it("should return different resource name for ORDER", () => {
        const actualResponse = getGraphQLResource(ORDER)
        expect(actualResponse).toStrictEqual('store_order')
    });

    it("should return the same value for any other resource", () => {
        const actualResponse = getGraphQLResource(STORE)
        expect(actualResponse).toStrictEqual(STORE)
    });

});