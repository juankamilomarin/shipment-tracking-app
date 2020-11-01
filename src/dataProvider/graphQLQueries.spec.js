import { getList, getMany, getOne, update, updateMany, create, bulkCreate } from './graphQLQueries'

describe("GraphQL queries", () => {

    const testResource = 'test_resource' 
    const testWhere = '{ name: "test" }'
    const testLimit = 100 
    const testOffset = 0
    const testOrderBy = '{ prop: asc }' 
    const testProperties = `test_property`
    const testId = 1
    const testPropertiesMap = {
        test_property1: 'test property 1',
        test_property2: 'test property 2'
    }
    const testIds = [1,2,3]

    const sanitizeString = (query) => query.trim().replace(/\s+/g, ' ').replace(/(\r\n|\n|\r)/gm,'')
    const assertQuery = (actualResponse, expectedResponse) => {
        expect([actualResponse[0], sanitizeString(actualResponse[1])])
            .toStrictEqual([expectedResponse[0], sanitizeString(expectedResponse[1])])
    }

    it("getList returns expected query", () => {
        const actualResponse = getList(testResource, testWhere, testLimit, testOffset, testOrderBy, testProperties)
        const expectedResponse = [
            'get_list_test_resource',
            `query get_list_test_resource
            {
                test_resource_aggregate(where: { name: "test" }) {
                    aggregate {
                        totalCount: count
                    }
                }
                test_resource(
                    where: { name: "test" },
                    limit: 100,
                    offset: 0,
                    order_by: { prop: asc }
                ) {
                    test_property
                }
            }`
        ]
        assertQuery(actualResponse, expectedResponse)
    });

    it("getMany returns expected query", () => {
        const actualResponse = getMany(testResource, testWhere, testProperties)
        const expectedResponse = [
            'get_many_test_resource',
            `query get_many_test_resource
            {
                test_resource_aggregate(where: { name: "test" }) {
                    aggregate {
                        totalCount: count
                    }
                }
                test_resource(
                    where: { name: "test" }
                ) {
                    test_property
                }
            }`
        ]
        assertQuery(actualResponse, expectedResponse)
    });

    it("getOne returns expected query", () => {
        const actualResponse = getOne(testResource, testId, testProperties)
        const expectedResponse = [
            'get_one_test_resource',
            `query get_one_test_resource
            {
                test_resource(
                    where: {
                        id: {_eq: 1 }
                    }
                ) {
                    test_property
                }
            }`
        ]
        assertQuery(actualResponse, expectedResponse)
    });

    it("update returns expected query", () => {
        const actualResponse = update(testResource, testId, testPropertiesMap)
        const expectedResponse = [
            'update_test_resource',
            `mutation update_test_resource{
                update_test_resource(
                    where: { 
                        id: { _eq: 1 } 
                    }
                    _set: {test_property1:"test property 1",test_property2:"test property 2"}
                ){
                    returning {
                        test_property1,test_property2
                    }
                }
            }`
        ]
        assertQuery(actualResponse, expectedResponse)
    });

    it("updateMany returns expected query", () => {
        const actualResponse = updateMany(testResource, testIds, testPropertiesMap)
        const expectedResponse = [
            'update_many_test_resource',
            `mutation update_many_test_resource{
                update_test_resource(
                    where: { 
                        id: { _in: [1,2,3] } 
                    }
                    _set: {test_property1:"test property 1",test_property2:"test property 2"}
                ){
                    returning {
                        test_property1,test_property2
                    }
                }
            }`
        ]
        assertQuery(actualResponse, expectedResponse)
    });

    it("create returns expected query", () => {
        const actualResponse = create(testResource, testPropertiesMap)
        const expectedResponse = [
            'insert_test_resource',
            `mutation insert_test_resource{
                insert_test_resource(
                    objects: {test_property1:"test property 1",test_property2:"test property 2"}
                ){
                    returning {
                        test_property1,test_property2,id
                    }
                }
            }`
        ]
        assertQuery(actualResponse, expectedResponse)
    });

    it("bulkCreate returns expected query", () => {
        const testObjects = [testPropertiesMap, testPropertiesMap]
        const actualResponse = bulkCreate(testResource, testObjects)
        const expectedResponse = [
            'bulk_create_test_resource',
            `mutation insert_test_resource{
                insert_test_resource(
                    objects: [{test_property1:"test property 1",test_property2:"test property 2"},{test_property1:"test property 1",test_property2:"test property 2"}]
                ){
                    returning {
                        test_property1,test_property2,id
                    }
                }
            }`
        ]
        assertQuery(actualResponse, expectedResponse)
    });

});