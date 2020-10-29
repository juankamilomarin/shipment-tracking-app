import getGraphQLRequest from './getGraphQLRequest';

describe("getGraphQLRequest", () => {

    it("should return expected request", async () => {
        const testQuery = { testQuery: 'test query' }
        const actualRequest = await getGraphQLRequest(testQuery)
        const expectedRequest = { 
            method: 'POST',
            headers: { 
                'content-type': 'application/json' 
            },
            body: "{\"query\":{\"testQuery\":\"test query\"}}"
        }
        expect(actualRequest).toStrictEqual(expectedRequest)
    });

});