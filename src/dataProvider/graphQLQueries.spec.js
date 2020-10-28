import { getList, getMany, getOne, update, updateMany, create, bulkCreate } from './graphQLQueries'

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

describe("GraphQL queries", () => {

    it("getList returns expected query", () => {
        const actualResponse = getList(testResource, testWhere, testLimit, testOffset, testOrderBy, testProperties)
        const expectedResponse = `
query get_list_test_resource
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
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("getMany returns expected query", () => {
        const actualResponse = getMany(testResource, testWhere, testProperties)
        const expectedResponse = `
query get_many_test_resource
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
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("getOne returns expected query", () => {
        const actualResponse = getOne(testResource, testId, testProperties)
        const expectedResponse = `
query get_one_test_resource
{
    test_resource(
        where: {
            id: {_eq: 1 }
        }
    ) {
        test_property
    }
}`
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("update returns expected query", () => {
        const actualResponse = update(testResource, testId, testPropertiesMap)
        const expectedResponse = `
mutation update_test_resource{
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
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("updateMany returns expected query", () => {
        const actualResponse = updateMany(testResource, testIds, testPropertiesMap)
        const expectedResponse = `
mutation update_many_test_resource{
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
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("create returns expected query", () => {
        const actualResponse = create(testResource, testPropertiesMap)
        const expectedResponse = `
mutation insert_test_resource{
    insert_test_resource(
        objects: {test_property1:"test property 1",test_property2:"test property 2"}
    ){
        returning {
            test_property1,test_property2,id
        }
    }
}`
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("bulkCreate returns expected query", () => {
        const testObjects = [testPropertiesMap, testPropertiesMap]
        const actualResponse = bulkCreate(testResource, testObjects)
        const expectedResponse = `
mutation insert_test_resource{
    insert_test_resource(
        objects: [{test_property1:"test property 1",test_property2:"test property 2"},{test_property1:"test property 1",test_property2:"test property 2"}]
    ){
        returning {
            test_property1,test_property2,id
        }
    }
}`
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

});