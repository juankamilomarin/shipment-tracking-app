import getGraphQLRequest from './getGraphQLRequest';

describe("getGraphQLRequest", () => {

    it("should return request with method type, headers and body", async () => {
        const operationName = 'testOperationName'
        const testQuery = { testQuery: 'test query' }
        const actualRequest = await getGraphQLRequest(operationName, testQuery)
        const expectedRequest = { 
            method: 'POST',
            headers: { 
                'content-type': 'application/json' 
            },
            body: "{\"operationName\":\"testOperationName\",\"query\":{\"testQuery\":\"test query\"}}"
        }
        expect(actualRequest).toStrictEqual(expectedRequest)
    });

});