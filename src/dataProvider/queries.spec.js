import { getList, getMany, getOne, update, updateMany, insert, bulkCreate, getManyReference } from './queries'

describe("GraphQL queries", () => {

    const resource = 'test' 
    const where = '{ name: "test" }'
    const limit = 100 
    const offset = 0
    const orderBy = '{ prop: asc }' 
    const properties = `test_property`
    const id = 1
    const data = {
        test_property1: 'test property 1',
        test_property2: 'test property 2'
    }
    const ids = [1,2,3]

    const sanitizeString = (query) => query.trim().replace(/\s+/g, ' ').replace(/(\r\n|\n|\r)/gm,'')
    const assertQuery = (actualResponse, expectedResponse) => expect(sanitizeString(actualResponse)).toBe(sanitizeString(expectedResponse))

    it("getList returns expected query", () => {
        const queryArguments = { where, limit, offset, orderBy }
        const actualResponse = getList(resource, properties, queryArguments)
        const expectedResponse = `
            query get_list_test
            {
                test_aggregate(where: { name: "test" }) {
                    aggregate {
                        totalCount: count
                    }
                }
                test(
                    where: { name: "test" },
                    limit: 100,
                    offset: 0,
                    order_by: { prop: asc }
                ) {
                    test_property
                }
            }`
        assertQuery(actualResponse, expectedResponse)
    });

    it("getMany returns expected query", () => {
        const queryArguments = { where }
        const actualResponse = getMany(resource, properties, queryArguments)
        const expectedResponse = `
            query get_many_test
            {
                test_aggregate(where: { name: "test" }) {
                    aggregate {
                        totalCount: count
                    }
                }
                test(
                    where: { name: "test" }
                ) {
                    test_property
                }
            }`
        assertQuery(actualResponse, expectedResponse)
    });

    it("getManyReference returns expected query", () => {
        const queryArguments = { where, limit, offset, orderBy }
        const actualResponse = getManyReference(resource, properties, queryArguments)
        const expectedResponse = `
            query get_many_reference_test
            {
                test_aggregate(where: { name: "test" }) {
                    aggregate {
                        totalCount: count
                    }
                }
                test(
                    where: { name: "test" },
                    limit: 100,
                    offset: 0,
                    order_by: { prop: asc }
                ) {
                    test_property
                }
            }`
        assertQuery(actualResponse, expectedResponse)
    });

    it("getOne returns expected query", () => {
        const actualResponse = getOne(resource, properties, id)
        const expectedResponse = `
            query get_one_test
            {
                test(
                    where: {
                        id: {_eq: 1 }
                    }
                ) {
                    test_property
                }
            }`
        assertQuery(actualResponse, expectedResponse)
    });

    it("update returns expected query", () => {
        const actualResponse = update(resource, id, data)
        const expectedResponse = `
            mutation update_test{
                update_test(
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
        assertQuery(actualResponse, expectedResponse)
    });

    it("updateMany returns expected query", () => {
        const actualResponse = updateMany(resource, ids, data)
        const expectedResponse = `
            mutation update_many_test{
                update_test(
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
        assertQuery(actualResponse, expectedResponse)
    });

    it("insert returns expected query", () => {
        const actualResponse = insert(resource, data)
        const expectedResponse = `
            mutation insert_test{
                insert_test(
                    objects: {test_property1:"test property 1",test_property2:"test property 2"}
                ){
                    returning {
                        test_property1,test_property2,id
                    }
                }
            }`
        assertQuery(actualResponse, expectedResponse)
    });

    it("bulkCreate returns expected query", () => {
        const testObjects = [data, data]
        const actualResponse = bulkCreate(resource, testObjects)
        const expectedResponse = `
            mutation insert_test{
                insert_test(
                    objects: [{test_property1:"test property 1",test_property2:"test property 2"},{test_property1:"test property 1",test_property2:"test property 2"}]
                ){
                    returning {
                        test_property1,test_property2,id
                    }
                }
            }`
        assertQuery(actualResponse, expectedResponse)
    });

});