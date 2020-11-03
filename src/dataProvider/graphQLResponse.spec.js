import { getDefaultGraphQLResponse } from './graphQLResponse'
import {
    GET_LIST,
    GET_MANY,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
    CREATE
} from 'react-admin'
import { COURIER } from './resources';

describe("getDefaultGraphQLResponse", () => {

    it("should return data and total count for getList method", () => {
        const testData = ['test data 1', 'test data 2', 'test data 3']
        const responseData = {
            data: {
                courier_aggregate: { aggregate: { totalCount: 10 } },
                courier: testData
            }
        }
        const expectedResponse ={
            data: testData,
            total: 10
        }

        const actualResponse = getDefaultGraphQLResponse(GET_LIST, COURIER, responseData)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should return data and total count for getMany method", () => {
        const testData = ['test data 1', 'test data 2', 'test data 3']
        const responseData = {
            data: {
                courier_aggregate: { aggregate: { totalCount: 10 } },
                courier: testData
            }
        }
        const expectedResponse ={
            data: testData,
            total: 10
        }

        const actualResponse = getDefaultGraphQLResponse(GET_MANY, COURIER, responseData)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should return data for getOne method", () => {
        const testData = ['test data 1']
        const responseData = {
            data: {
                courier: testData
            }
        }
        const expectedResponse ={
            data: testData[0]
        }

        const actualResponse = getDefaultGraphQLResponse(GET_ONE, COURIER, responseData)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should return data for update method", () => {
        const testData = ['test data 1']
        const responseData = {
            data: {
                update_courier: {
                    returning: testData
                }
            }
        }
        const expectedResponse ={
            data: testData[0]
        }

        const actualResponse = getDefaultGraphQLResponse(UPDATE, COURIER, responseData)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should return data for updateMany method", () => {
        const testData = [
            { id: 1 }, { id: 2 }, { id: 3 }
        ]
        const responseData = {
            data: {
                update_courier: {
                    returning: testData
                }
            }
        }
        const expectedResponse ={
            data: [1,2,3]
        }

        const actualResponse = getDefaultGraphQLResponse(UPDATE_MANY, COURIER, responseData)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should return data for create method", () => {
        const testData = 'test data 1'
        const responseData = {
            data: {
                insert_courier: {
                    returning: testData
                }
            }
        }
        const expectedResponse ={
            data: testData[0]
        }

        const actualResponse = getDefaultGraphQLResponse(CREATE, COURIER, responseData)
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

});