import { getDefaultGraphQLRequest, getGraphQLRequest } from './graphQLRequest';
import getQuery from './getQuery';
import getSessionToken from '../authProvider/getSessionToken'

jest.mock('./getQuery')
jest.mock('../authProvider/getSessionToken')

describe("getDefaultGraphQLRequest", () => {

    beforeEach(() => {
        getQuery.mockImplementation(() => ['testOperationName', 'testQuery'])
        getSessionToken.mockImplementation(() => Promise.resolve('sessionToken'))
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return request with method type, headers and body", async () => {
        const type = 'testType'
        const resource = 'testResource'
        const params = {}
        const actualRequest = await getDefaultGraphQLRequest(type, resource, params)
        const expectedRequest = { 
            method: 'POST',
            headers: { 
                'content-type': 'application/json',
                'Authorization': 'sessionToken'
            },
            body: "{\"operationName\":\"testOperationName\",\"query\":\"testQuery\"}"
        }
        expect(actualRequest).toStrictEqual(expectedRequest)
    });

});

describe("getGraphQLRequest", () => {
    beforeEach(() => {
        getSessionToken.mockImplementation(() => Promise.resolve('sessionToken'))
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return request with method type, headers and body", async () => {
        const operationName = 'testOperationName'
        const query = 'testQuery'
        const actualRequest = await getGraphQLRequest(operationName, query)
        const expectedRequest = { 
            method: 'POST',
            headers: { 
                'content-type': 'application/json',
                'Authorization': 'sessionToken'
            },
            body: "{\"operationName\":\"testOperationName\",\"query\":\"testQuery\"}"
        }
        expect(actualRequest).toStrictEqual(expectedRequest)
    });

});