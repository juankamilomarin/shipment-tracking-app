import CustomError, { ERROR_TYPES } from './CustomError'

describe("CustomError", () => {

    const testMessage = 'Test message'

    beforeAll(() => {
        global.console.error = () => {}
    })

    beforeEach(() => {
        global.Error = jest.fn().mockImplementation((message) => {
            return { message }
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should set 'User not authenticated' message property for USER_NOT_AUTHENTICATED error", () => {
        const errorSpy = jest.spyOn(console, 'error')
        const customError = new CustomError(ERROR_TYPES.USER_NOT_AUTHENTICATED, testMessage)
        expect(errorSpy).toBeCalledWith(testMessage)
        expect(customError.type).toBe(ERROR_TYPES.USER_NOT_AUTHENTICATED)
        expect(customError.message).toBe('User not authenticated')
    });

    it("should set same error message property for METHOD_NOT_VALID error", () => {
        const errorSpy = jest.spyOn(console, 'error')
        const customError = new CustomError(ERROR_TYPES.METHOD_NOT_VALID, testMessage)
        expect(errorSpy).toBeCalledWith(testMessage)
        expect(customError.type).toBe(ERROR_TYPES.METHOD_NOT_VALID)
        expect(customError.message).toBe(testMessage)
    });

    it("should set same error message property for METHOD_REQUEST_NOT_IMPLEMENTED error", () => {
        const errorSpy = jest.spyOn(console, 'error')
        const customError = new CustomError(ERROR_TYPES.METHOD_REQUEST_NOT_IMPLEMENTED, testMessage)
        expect(errorSpy).toBeCalledWith(testMessage)
        expect(customError.type).toBe(ERROR_TYPES.METHOD_REQUEST_NOT_IMPLEMENTED)
        expect(customError.message).toBe(testMessage)
    });

    it("should set same error message property for METHOD_RESPONSE_NOT_IMPLEMENTED error", () => {
        const errorSpy = jest.spyOn(console, 'error')
        const customError = new CustomError(ERROR_TYPES.METHOD_RESPONSE_NOT_IMPLEMENTED, testMessage)
        expect(errorSpy).toBeCalledWith(testMessage)
        expect(customError.type).toBe(ERROR_TYPES.METHOD_RESPONSE_NOT_IMPLEMENTED)
        expect(customError.message).toBe(testMessage)
    });

    it("should set unknown message property for any other type of error", () => {
        const errorSpy = jest.spyOn(console, 'error')
        const customError = new CustomError('ANY TYPE', testMessage)
        expect(errorSpy).toBeCalledWith(testMessage)
        expect(customError.type).toBe(ERROR_TYPES.UNKNOWN_ERROR)
        expect(customError.message).toBe(`Unknow error: ${testMessage}`)
    });

    it("should set response and resource properties", () => {
        const response = {
            errors: [{
                message: 'Original message'
            }]
        }
        const resource = 'test resource'
        const customError = new CustomError('ANY TYPE', testMessage, response, resource)
        expect(customError.response).toStrictEqual(response)
        expect(customError.resource).toBe(resource)
    });

    it("should call captureStackTrace", () => {
        let actualObject = null
        let actualConstructor = null
        global.Error.captureStackTrace = jest.fn().mockImplementation((obj, constructor) => {
            actualObject = obj;
            actualConstructor = constructor;
        })
        const customError = new CustomError('ANY TYPE', testMessage)
        expect(actualObject).toStrictEqual(customError)
        expect(actualConstructor).toBe(CustomError)
    });
});