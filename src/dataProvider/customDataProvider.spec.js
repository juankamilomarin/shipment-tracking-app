import customDataProvider from './customDataProvider'
import * as getRequest from './getRequest'      // Alias is needed to spy on it
import * as getResponse from './getResponse'    // Alias is needed to spy on it

jest.mock('./getRequest')
jest.mock('./getResponse')

const type = 'test type'
const resource = 'test resouce'
const params = 'test params'

describe("customDataProvider", () => {

    beforeAll(() => {
        global.fetch = jest.fn()
    })

    const getRequestResult = 'getRequest'
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
});