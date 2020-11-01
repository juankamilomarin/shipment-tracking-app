import getRequest from './getRequest'
import * as graphQLQueries from './graphQLQueries'
import { getList, getMany, getOne, update, updateMany, create } from './graphQLQueries'
import {
    GET_LIST,
    GET_MANY,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
    CREATE
} from 'react-admin'
import { COURIER } from './resources'
import { RESOURCE_PROPERTIES } from '../couriers'
import getGraphQLRequest from './getGraphQLRequest'

jest.mock('./graphQLQueries')
jest.mock('./getGraphQLRequest')

describe("getRequest - getList", () => {

    beforeEach(() => {
        getList.mockImplementation(() => ['getList'])
        getGraphQLRequest.mockImplementation((operationName, _) => operationName)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return request with no conditions when filter parameter is empty", async () => {
        const getListSpy = jest.spyOn(graphQLQueries, 'getList');
        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            filter: {},
            sort: {}
        }

        const actualRequest = await getRequest(GET_LIST, COURIER, requestParams)
        expect(getListSpy).toBeCalledWith(COURIER, "{  }", 100, 0, "{}", RESOURCE_PROPERTIES)
        expect(actualRequest).toBe('getList')
    });

    it("should return request with no conditions when filter parameter is not provided", async () => {
        const getListSpy = jest.spyOn(graphQLQueries, 'getList');

        const requestParams = {
            pagination: {
                perPage: 100,
                page: 1
            },
            sort: {}
        }

        const actualRequest = await getRequest(GET_LIST, COURIER, requestParams)
        expect(getListSpy).toBeCalledWith(COURIER, "{  }", 100, 0, "{}", RESOURCE_PROPERTIES)
        expect(actualRequest).toBe('getList')
    });

    it("should return request with conditions when filter parameter is provided", async () => {
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

        const actualRequest = await getRequest(GET_LIST, COURIER, requestParams)
        expect(getListSpy).toBeCalledWith(COURIER, "{ filter1: { _eq: \"filter 1\" },filter2: { _eq: \"filter 2\" }, }", 100, 0, "{}", RESOURCE_PROPERTIES)
        expect(actualRequest).toBe('getList')
    });

    it("should return request with order clause when sort parameter is provided", async () => {
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
        
        const actualRequest = await getRequest(GET_LIST, COURIER, requestParams)
        expect(getListSpy).toBeCalledWith(COURIER, "{  }", 100, 0, "{name: desc}", RESOURCE_PROPERTIES)
        expect(actualRequest).toBe('getList')
    });

    it("should return request with pagination", async () => {
        const getListSpy = jest.spyOn(graphQLQueries, 'getList');

        const requestParams = {
            pagination: {
                perPage: 40,
                page: 3
            },
            sort: {}
        }
        
        const actualRequest = await getRequest(GET_LIST, COURIER, requestParams)
        expect(getListSpy).toBeCalledWith(COURIER, "{  }", 40, 80, "{}", RESOURCE_PROPERTIES)
        expect(actualRequest).toBe('getList')
    });

});

describe("getRequest - getMany", () => {

    beforeEach(() => {
        getMany.mockImplementation(() => ['getMany'])
        getGraphQLRequest.mockImplementation((operationName, _) => operationName)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return request with no conditions when filter parameter is empty", async () => {
        const getManySpy = jest.spyOn(graphQLQueries, 'getMany');

        const filters = {}
        const requestParams = {
            filter: filters,
            ids: [1,2,3]
        }

        const actualRequest = await getRequest(GET_MANY, COURIER, requestParams)
        expect(getManySpy).toBeCalledWith(COURIER, "{ id: { _in: [1,2,3] } }", RESOURCE_PROPERTIES)
        expect(actualRequest).toBe('getMany')
    });

    it("should return request with no conditions when filter parameter is not provided", async () => {
        const getManySpy = jest.spyOn(graphQLQueries, 'getMany');

        const requestParams = {
            ids: [1,2,3]
        }

        const actualRequest = await getRequest(GET_MANY, COURIER, requestParams)
        expect(getManySpy).toBeCalledWith(COURIER, "{ id: { _in: [1,2,3] } }", RESOURCE_PROPERTIES)
        expect(actualRequest).toBe('getMany')
    });

    it("should return request with conditions when filter parameter is provided", async () => {
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

        const actualRequest = await getRequest(GET_MANY, COURIER, requestParams)
        expect(getManySpy).toBeCalledWith(COURIER, "{ name: { _eq: \"test name\" },otherFilter1: { _eq: \"other filter 1\" },otherFilter2: { _eq: \"other filter 2\" },id: { _in: [1,2,3] } }", RESOURCE_PROPERTIES)
        expect(actualRequest).toBe('getMany')
    });

});

describe("getRequest - getOne", () => {

    beforeEach(() => {
        getOne.mockImplementation(() => ['getOne'])
        getGraphQLRequest.mockImplementation((operationName, _) => operationName)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return request for a given resource id", async () => {
        const getOneSpy = jest.spyOn(graphQLQueries, 'getOne');

        const testId = 1
        const requestParams = {
            id: testId
        }

        const actualRequest = await getRequest(GET_ONE, COURIER, requestParams)
        expect(getOneSpy).toBeCalledWith(COURIER, testId, RESOURCE_PROPERTIES)
        expect(actualRequest).toBe('getOne')
    });

});

describe("getRequest - update", () => {

    beforeEach(() => {
        update.mockImplementation(() => ['update'])
        getGraphQLRequest.mockImplementation((operationName, _) => operationName)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return request for a given resource id", async () => {
        const updateSpy = jest.spyOn(graphQLQueries, 'update');
        
        const testId = 1
        const testData = { test: 'test' }
        const requestParams = {
            id: testId,
            data: testData
        }

        const actualRequest = await getRequest(UPDATE, COURIER, requestParams)
        expect(updateSpy).toBeCalledWith(COURIER, testId, testData)
        expect(actualRequest).toBe('update')
    });

});

describe("getRequest - updateMany", () => {

    beforeEach(() => {
        updateMany.mockImplementation(() => ['updateMany'])
        getGraphQLRequest.mockImplementation((operationName, _) => operationName)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should return request for a given list of resource ids", async () => {
        const updateManySpy = jest.spyOn(graphQLQueries, 'updateMany');
        
        const testIds = [1,2,3]
        const testData = { test: 'test' }
        const requestParams = {
            ids: testIds,
            data: testData
        }

        const actualRequest = await getRequest(UPDATE_MANY, COURIER, requestParams)
        expect(updateManySpy).toBeCalledWith(COURIER, testIds, testData)
        expect(actualRequest).toBe('updateMany')
    });

});

describe("getRequest - create", () => {

    beforeEach(() => {
        create.mockImplementation(() => ['create'])
        getGraphQLRequest.mockImplementation((operationName, _) => operationName)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return request with the given resource data", async () => {
        const createSpy = jest.spyOn(graphQLQueries, 'create');

        const testData = { test: 'test' }
        const requestParams = {
            data: testData
        }

        const actualRequest = await getRequest(CREATE, COURIER, requestParams)
        expect(createSpy).toBeCalledWith(COURIER, testData)
        expect(actualRequest).toBe('create')
    });

});