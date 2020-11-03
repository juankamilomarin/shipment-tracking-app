// TODO Implement cache
import {
    GET_LIST,
    GET_MANY,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
    CREATE
} from 'react-admin'
import CustomError from '../util/CustomError'
import { ERROR_TYPES } from '../util/CustomError'
import checkMethodType from './checkMethodType'
import { getDefaultGraphQLResponse } from './graphQLResponse'

const checkResponseError = (response, resource) => {
    if ('errors' in response) throw new CustomError(ERROR_TYPES.RESPONSE_ERROR, 'Response error', response, resource)
}

const CUSTOM_RESPONSE_METHODS = {
    [GET_LIST]: {},
    [GET_MANY]: {},
    [GET_ONE]: {},
    [UPDATE]: {},
    [UPDATE_MANY]: {},
    [CREATE]: {},
}

const getResponse = (responseData, type, resource) => {
    checkMethodType(type)
    checkResponseError(responseData, resource)
    const response = (CUSTOM_RESPONSE_METHODS[type][resource]) ? CUSTOM_RESPONSE_METHODS[type][resource](responseData) : getDefaultGraphQLResponse(type, resource, responseData)
    return response
}

export default getResponse