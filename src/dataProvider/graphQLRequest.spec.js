import { getDefaultGraphQLRequest, getGraphQLRequest } from './graphQLRequest';
import getQuery from './getQuery';

jest.mock('./getQuery')

describe("getDefaultGraphQLRequest", () => {

    beforeEach(() => {
        getQuery.mockImplementation(() => ['testOperationName', 'testQuery'])
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
                'content-type': 'application/json' 
            },
            body: "{\"operationName\":\"testOperationName\",\"query\":\"testQuery\"}"
        }
        expect(actualRequest).toStrictEqual(expectedRequest)
    });

});

describe("getGraphQLRequest", () => {

    it("should return request with method type, headers and body", async () => {
        const operationName = 'testOperationName'
        const query = 'testQuery'
        const actualRequest = await getGraphQLRequest(operationName, query)
        const expectedRequest = { 
            method: 'POST',
            headers: { 
                'content-type': 'application/json' 
            },
            body: "{\"operationName\":\"testOperationName\",\"query\":\"testQuery\"}"
        }
        expect(actualRequest).toStrictEqual(expectedRequest)
    });

});