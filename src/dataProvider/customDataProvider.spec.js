import customDataProvider from './customDataProvider'
import * as getRequest from './getRequest'      // Alias is needed to spy on it
import * as getResponse from './getResponse'    // Alias is needed to spy on it
import { GET_ONE, GET_LIST, GET_MANY } from 'react-admin'
import { DateTime } from 'luxon'

jest.mock('./getRequest')
jest.mock('./getResponse')

describe("customDataProvider", () => {

    const type = 'test type'
    const resource = 'test resouce'
    const params = 'test params'
    const getRequestResult = 'getRequest'

    beforeAll(() => {
        global.fetch = jest.fn()
    })

    beforeEach(() => {
        getRequest.default.mockImplementation(() => Promise.resolve(getRequestResult))
        getResponse.default.mockImplementation((responseData, type, resource) => ({ responseData, type, resource }))
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return request promise for the given type, resource and parameters", async () => {
        const fetchMock = () => Promise.resolve({
            json: () => Promise.resolve({})
        })
        global.fetch.mockImplementation(fetchMock)
        const fetchSpy = jest.spyOn(global, 'fetch')
        const getRequestSpy = jest.spyOn(getRequest, 'default')
        await customDataProvider(type, resource, params)
        const expectedEnpoint = global.config.hasura.endpoint + '/v1/graphql'
        expect(fetchSpy).toBeCalledWith(expectedEnpoint, getRequestResult)
        expect(getRequestSpy).toBeCalledWith(type, resource, params)
    });

    it("should return expected response once the promise is resolved", async () => {
        const responseData = { test: 'test' }
        const fetchMock = () => Promise.resolve({ 
            json: () => Promise.resolve(responseData)
        })
        global.fetch.mockImplementation(fetchMock)
        const getResponseSpy = jest.spyOn(getResponse, 'default')
        const actualResponse = await customDataProvider(type, resource, params)
        expect(getResponseSpy).toBeCalledWith(responseData, type, resource)
        const expectedResponse = { responseData, type, resource }
        expect(actualResponse).toStrictEqual(expectedResponse)
    });

    it("should reject promise if an error is detected", async () => {
        const expectedErrorMessage = 'RequestError'
        const fetchMock = () => { 
            throw new Error(expectedErrorMessage) 
        }
        global.fetch.mockImplementation(fetchMock)
        await customDataProvider(type, resource, params).catch(error => {
            expect(error.message).toBe(expectedErrorMessage)
        })
    });

    it("should cache response for GET_ONE method type", async () => {
        const fetchMock = () => Promise.resolve({ 
            json: () => Promise.resolve({})
        })
        global.fetch.mockImplementation(fetchMock)
        const actualResponse = await customDataProvider(GET_ONE, resource, params)
        expect(actualResponse.validUntil).toBeInstanceOf(DateTime)
    });

    it("should cache response for GET_LIST method type", async () => {
        const fetchMock = () => Promise.resolve({ 
            json: () => Promise.resolve({})
        })
        global.fetch.mockImplementation(fetchMock)
        const actualResponse = await customDataProvider(GET_LIST, resource, params)
        expect(actualResponse.validUntil).toBeInstanceOf(DateTime)
    });

    it("should cache response for GET_MANY method type", async () => {
        const fetchMock = () => Promise.resolve({ 
            json: () => Promise.resolve({})
        })
        global.fetch.mockImplementation(fetchMock)
        const actualResponse = await customDataProvider(GET_MANY, resource, params)
        expect(actualResponse.validUntil).toBeInstanceOf(DateTime)
    });
});