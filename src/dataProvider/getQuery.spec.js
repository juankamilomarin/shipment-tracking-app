import getQuery from './getQuery'
import * as graphQLQueries from './queries'
import { 
    getList,
    getMany,
    getManyReference,
    getOne,
    update,
    updateMany,
    insert,
    deleteQuery,
    deleteMany
} from './queries'
import {
    GET_LIST,
    GET_MANY,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
    CREATE,
    GET_MANY_REFERENCE,
    DELETE_MANY,
    DELETE
} from 'react-admin'
import { COURIER } from './resources'
import { RESOURCE_PROPERTIES } from '../couriers'

jest.mock('./queries')

describe("getQuery - getList", () => {

    beforeEach(() => {
        getList.mockImplementation(() => 'getList')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    
    it("should return operation name", () => {
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }
        const [operationName,] = getQuery(GET_LIST, COURIER, requestParams)
        expect(operationName).toBe('get_list_courier')
    });

    it("should return query with no conditions when filter parameter is empty", () => {
        const getListSpy = jest.spyOn(graphQLQueries, 'getList');
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }
        const [, query] = getQuery(GET_LIST, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{  }", 
            limit: 100, 
            offset: 0, 
            orderBy: "{}"
        }
        expect(getListSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getList')
    });

    it("should return query with no conditions when filter parameter is not provided", () => {
        const getListSpy = jest.spyOn(graphQLQueries, 'getList');
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            sort: {}
        }
        const [, query] = getQuery(GET_LIST, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{  }", 
            limit: 100, 
            offset: 0, 
            orderBy: "{}"
        }
        expect(getListSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getList')
    });

    it("should return query with conditions when filter parameter is provided", () => {
        const getListSpy = jest.spyOn(graphQLQueries, 'getList');
        const filters = {
            filter1: 'filter 1',
            filter2: 'filter 2'
        }
        let requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: filters,
            sort: {}
        }
        const [, query] = getQuery(GET_LIST, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{ filter1: { _eq: \"filter 1\" },filter2: { _eq: \"filter 2\" }, }", 
            limit: 100, 
            offset: 0, 
            orderBy: "{}"
        }
        expect(getListSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getList')
    });

    it("should return query with order clause when sort parameter is provided", () => {
        const getListSpy = jest.spyOn(graphQLQueries, 'getList');
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            sort: {
                field: 'name',
                order: 'DESC'
            }
        }
        const [, query] = getQuery(GET_LIST, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{  }", 
            limit: 100, 
            offset: 0, 
            orderBy: "{name: desc}"
        }
        expect(getListSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getList')
    });

    it("should return query with pagination", () => {
        const getListSpy = jest.spyOn(graphQLQueries, 'getList');
        const requestParams = {
            pagination: {
                perPage: 40,
                page: 3
            },
            sort: {}
        }
        const [, query] = getQuery(GET_LIST, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{  }", 
            limit: 40, 
            offset: 80, 
            orderBy: "{}"
        }
        expect(getListSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getList')
    });

});

describe("getQuery - getMany", () => {

    beforeEach(() => {
        getMany.mockImplementation(() => 'getMany')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return operation name", () => {
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }
        const [operationName,] = getQuery(GET_MANY, COURIER, requestParams)
        expect(operationName).toBe('get_many_courier')
    });

    it("should return query with no conditions when filter parameter is empty", () => {
        const getManySpy = jest.spyOn(graphQLQueries, 'getMany');
        const filters = {}
        const requestParams = {
            filter: filters,
            ids: [1,2,3]
        }
        const [, query] = getQuery(GET_MANY, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{ id: { _in: [1,2,3] } }",
        }
        expect(getManySpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getMany')
    });

    it("should return request with no conditions when filter parameter is not provided", () => {
        const getManySpy = jest.spyOn(graphQLQueries, 'getMany');
        const requestParams = {
            ids: [1,2,3]
        }
        const [, query] = getQuery(GET_MANY, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{ id: { _in: [1,2,3] } }",
        }
        expect(getManySpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getMany')
    });

    it("should return request with conditions when filter parameter is provided", () => {
        const getManySpy = jest.spyOn(graphQLQueries, 'getMany');
        const filters = {
            name: 'test name',
            otherFilter1: 'other filter 1',
            otherFilter2: 'other filter 2'
        }
        let requestParams = {
            filter: filters,
            ids: [1,2,3]
        }

        const [, query] = getQuery(GET_MANY, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{ name: { _eq: \"test name\" },otherFilter1: { _eq: \"other filter 1\" },otherFilter2: { _eq: \"other filter 2\" },id: { _in: [1,2,3] } }",
        }
        expect(getManySpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getMany')
    });

});

describe("getQuery - getManyReference", () => {

    beforeEach(() => {
        getManyReference.mockImplementation(() => 'getManyReference')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    
    it("should return operation name", () => {
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }
        const [operationName,] = getQuery(GET_MANY_REFERENCE, COURIER, requestParams)
        expect(operationName).toBe('get_many_reference_courier')
    });

    it("should return query with target id condition when filter parameter is empty", () => {
        const getManyReferenceSpy = jest.spyOn(graphQLQueries, 'getManyReference');
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {},
            id: 123,
            target: 'target_id'
        }
        const [, query] = getQuery(GET_MANY_REFERENCE, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{ target_id: { _eq: 123 }, }", 
            limit: 100, 
            offset: 0, 
            orderBy: "{}"
        }
        expect(getManyReferenceSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getManyReference')
    });

    it("should return query with target id condition when filter parameter is not provided", () => {
        const getManyReferenceSpy = jest.spyOn(graphQLQueries, 'getManyReference');
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            sort: {},
            id: 123,
            target: 'target_id'
        }
        const [, query] = getQuery(GET_MANY_REFERENCE, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{ target_id: { _eq: 123 }, }", 
            limit: 100, 
            offset: 0, 
            orderBy: "{}"
        }
        expect(getManyReferenceSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getManyReference')
    });

    it("should return query with target id and other conditions when filter parameter is provided", () => {
        const getManyReferenceSpy = jest.spyOn(graphQLQueries, 'getManyReference');
        const filters = {
            filter1: 'filter 1',
            filter2: 'filter 2'
        }
        let requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: filters,
            sort: {},
            id: 123,
            target: 'target_id'
        }
        const [, query] = getQuery(GET_MANY_REFERENCE, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{ filter1: { _eq: \"filter 1\" },filter2: { _eq: \"filter 2\" },target_id: { _eq: 123 }, }", 
            limit: 100, 
            offset: 0, 
            orderBy: "{}"
        }
        expect(getManyReferenceSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getManyReference')
    });

    it("should return query with order clause when sort parameter is provided", () => {
        const getManyReferenceSpy = jest.spyOn(graphQLQueries, 'getManyReference');
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            sort: {
                field: 'name',
                order: 'DESC'
            },
            id: 123,
            target: 'target_id'
        }
        const [, query] = getQuery(GET_MANY_REFERENCE, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{ target_id: { _eq: 123 }, }", 
            limit: 100, 
            offset: 0, 
            orderBy: "{name: desc}"
        }
        expect(getManyReferenceSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getManyReference')
    });

    it("should return query with pagination", () => {
        const getManyReferenceSpy = jest.spyOn(graphQLQueries, 'getManyReference');
        const requestParams = {
            pagination: {
                perPage: 40,
                page: 3
            },
            sort: {},
            id: 123,
            target: 'target_id'
        }
        const [, query] = getQuery(GET_MANY_REFERENCE, COURIER, requestParams)
        const expectedQueryArguments = { 
            where: "{ target_id: { _eq: 123 }, }", 
            limit: 40, 
            offset: 80, 
            orderBy: "{}"
        }
        expect(getManyReferenceSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, expectedQueryArguments)
        expect(query).toBe('getManyReference')
    });

});

describe("getQuery - getOne", () => {

    beforeEach(() => {
        getOne.mockImplementation(() => 'getOne')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return operation name", () => {
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }
        const [operationName,] = getQuery(GET_ONE, COURIER, requestParams)
        expect(operationName).toBe('get_one_courier')
    });

    it("should return query for a given resource id", () => {
        const getOneSpy = jest.spyOn(graphQLQueries, 'getOne');
        const requestParams = {
            id: 1
        }
        const [, query] = getQuery(GET_ONE, COURIER, requestParams)
        expect(getOneSpy).toBeCalledWith(COURIER, RESOURCE_PROPERTIES, 1)
        expect(query).toBe('getOne')
    });

});

describe("getQuery - update", () => {

    beforeEach(() => {
        update.mockImplementation(() => 'update')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return operation name", () => {
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }
        const [operationName,] = getQuery(UPDATE, COURIER, requestParams)
        expect(operationName).toBe('update_courier')
    });

    it("should return query for a given resource id", () => {
        const updateSpy = jest.spyOn(graphQLQueries, 'update');
        const testId = 1
        const testData = { test: 'test' }
        const requestParams = {
            id: testId,
            data: testData
        }
        const [, query] = getQuery(UPDATE, COURIER, requestParams)
        expect(updateSpy).toBeCalledWith(COURIER, testId, testData)
        expect(query).toBe('update')
    });

});

describe("getQuery - updateMany", () => {

    beforeEach(() => {
        updateMany.mockImplementation(() => 'updateMany')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return operation name", () => {
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }
        const [operationName,] = getQuery(UPDATE_MANY, COURIER, requestParams)
        expect(operationName).toBe('update_many_courier')
    });

    it("should return request for a given list of resource ids", () => {
        const updateManySpy = jest.spyOn(graphQLQueries, 'updateMany');
        
        const testIds = [1,2,3]
        const testData = { test: 'test' }
        const requestParams = {
            ids: testIds,
            data: testData
        }

        const [, query] = getQuery(UPDATE_MANY, COURIER, requestParams)
        expect(updateManySpy).toBeCalledWith(COURIER, testIds, testData)
        expect(query).toBe('updateMany')
    });

});

describe("getQuery - create", () => {

    beforeEach(() => {
        insert.mockImplementation(() => 'insert')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return operation name", () => {
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }
        const [operationName,] = getQuery(CREATE, COURIER, requestParams)
        expect(operationName).toBe('insert_courier')
    });

    it("should return request with the given resource data", () => {
        const createSpy = jest.spyOn(graphQLQueries, 'insert');

        const testData = { test: 'test' }
        const requestParams = {
            data: testData
        }

        const [, query] = getQuery(CREATE, COURIER, requestParams)
        expect(createSpy).toBeCalledWith(COURIER, testData)
        expect(query).toBe('insert')
    });

});


describe("getQuery - delete", () => {

    beforeEach(() => {
        deleteQuery.mockImplementation(() => 'deleteQuery')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return operation name", () => {
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }
        const [operationName,] = getQuery(DELETE, COURIER, requestParams)
        expect(operationName).toBe('delete_courier')
    });

    it("should return query for a given resource id", () => {
        const deleteQuerySpy = jest.spyOn(graphQLQueries, 'deleteQuery');
        const testId = 1
        const requestParams = {
            id: testId
        }
        const [, query] = getQuery(DELETE, COURIER, requestParams)
        expect(deleteQuerySpy).toBeCalledWith(COURIER, testId)
        expect(query).toBe('deleteQuery')
    });

});

describe("getQuery - deleteMany", () => {

    beforeEach(() => {
        deleteMany.mockImplementation(() => 'deleteMany')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return operation name", () => {
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }
        const [operationName,] = getQuery(DELETE_MANY, COURIER, requestParams)
        expect(operationName).toBe('delete_many_courier')
    });

    it("should return request for a given list of resource ids", () => {
        const deleteManySpy = jest.spyOn(graphQLQueries, 'deleteMany');
        
        const testIds = [1,2,3]
        const requestParams = {
            ids: testIds
        }

        const [, query] = getQuery(DELETE_MANY, COURIER, requestParams)
        expect(deleteManySpy).toBeCalledWith(COURIER, testIds)
        expect(query).toBe('deleteMany')
    });

});