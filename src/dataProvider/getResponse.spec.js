import getResponse from './getResponse'
import {
    GET_LIST,
    GET_MANY,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
    CREATE
} from 'react-admin'
import { COURIER } from './resources';

describe("getResponse", () => {

    it("should return data and total count for getList method", () => {
        const testData = ['test data 1', 'test data 2', 'test data 3']
        const testResponse = {
            data: {
                courier_aggregate: { aggregate: { totalCount: 10 } },
                courier: testData
            }
        }
        const expectedResponse ={
            data: testData,
            total: 10
        }

        const actualResponse = getResponse(testResponse, GET_LIST, COURIER)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should return data and total count for getMany method", () => {
        const GET_MANY_RESPONSE_WITH_NO_IMPLEMENTATION = COURIER
        const testData = ['test data 1', 'test data 2', 'test data 3']
        const testResponse = {
            data: {
                courier_aggregate: { aggregate: { totalCount: 10 } },
                courier: testData
            }
        }
        const expectedResponse ={
            data: testData,
            total: 10
        }

        const actualResponse = getResponse(testResponse, GET_MANY, GET_MANY_RESPONSE_WITH_NO_IMPLEMENTATION)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should return data for getOne method", () => {
        const GET_ONE_RESPONSE_WITH_NO_IMPLEMENTATION = COURIER
        const testData = ['test data 1']
        const testResponse = {
            data: {
                courier: testData
            }
        }
        const expectedResponse ={
            data: testData[0]
        }

        const actualResponse = getResponse(testResponse, GET_ONE, GET_ONE_RESPONSE_WITH_NO_IMPLEMENTATION)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should return data for update method", () => {
        const UPDATE_RESPONSE_WITH_NO_IMPLEMENTATION = COURIER
        const testData = ['test data 1']
        const testResponse = {
            data: {
                update_courier: {
                    returning: testData
                }
            }
        }
        const expectedResponse ={
            data: testData[0]
        }

        const actualResponse = getResponse(testResponse, UPDATE, UPDATE_RESPONSE_WITH_NO_IMPLEMENTATION)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should return data for updateMany method", () => {
        const UPDATE_MANY_RESPONSE_WITH_NO_IMPLEMENTATION = COURIER
        const testData = [
            { id: 1 }, { id: 2 }, { id: 3 }
        ]
        const testResponse = {
            data: {
                update_courier: {
                    returning: testData
                }
            }
        }
        const expectedResponse ={
            data: [1,2,3]
        }

        const actualResponse = getResponse(testResponse, UPDATE_MANY, UPDATE_MANY_RESPONSE_WITH_NO_IMPLEMENTATION)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should return data for create method", () => {
        const CREATE_RESPONSE_WITH_NO_IMPLEMENTATION = COURIER
        const testData = 'test data 1'
        const testResponse = {
            data: {
                insert_courier: {
                    returning: testData
                }
            }
        }
        const expectedResponse ={
            data: testData[0]
        }

        const actualResponse = getResponse(testResponse, CREATE, CREATE_RESPONSE_WITH_NO_IMPLEMENTATION)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

});