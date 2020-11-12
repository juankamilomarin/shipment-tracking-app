export const ERROR_TYPES = {
    METHOD_NOT_VALID: 'METHOD_NOT_VALID',
    METHOD_REQUEST_NOT_IMPLEMENTED: 'METHOD_REQUEST_NOT_IMPLEMENTED',
    METHOD_RESPONSE_NOT_IMPLEMENTED: 'METHOD_RESPONSE_NOT_IMPLEMENTED',
    RESPONSE_ERROR: 'RESPONSE_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    USER_NOT_AUTHENTICATED_MESSAGE: 'USER_NOT_AUTHENTICATED_MESSAGE'
}

const logError = (errorMessage) => {
    console.error(errorMessage)
}

export default class CustomError extends Error {
    constructor(type, message, response, resource) {
        let newMessage = ''
        let newType = type
        switch (type) {
            case ERROR_TYPES.USER_NOT_AUTHENTICATED:
                newMessage = 'User not authenticated'
                break;
            case ERROR_TYPES.METHOD_NOT_VALID:
            case ERROR_TYPES.METHOD_REQUEST_NOT_IMPLEMENTED:
            case ERROR_TYPES.METHOD_RESPONSE_NOT_IMPLEMENTED:
                newMessage = message
                break;
            default:
                newType = ERROR_TYPES.UNKNOWN_ERROR
                newMessage = 'Unknow error: ' + message
        }
        logError(message)
        super(newMessage)
    
        // Maintains proper stack trace
        if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError)

        this.type = newType
        this.response = response
        this.resource = resource
    }
}