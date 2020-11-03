import {
    GET_LIST,
    GET_MANY,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
    CREATE
} from 'react-admin'
import checkMethodType from './checkMethodType'
import { getDefaultGraphQLRequest } from './graphQLRequest'

const CUSTOM_REQUEST_METHODS = {
    [GET_LIST]: {},
    [GET_MANY]: {},
    [GET_ONE]: {},
    [UPDATE]: {},
    [UPDATE_MANY]: {},
    [CREATE]: {},
}

const getRequest = async (type, resource, params) => {
    checkMethodType(type)
    if(CUSTOM_REQUEST_METHODS[type][resource]) return await CUSTOM_REQUEST_METHODS[type][resource](params)
    return await getDefaultGraphQLRequest(type, resource, params)
}

export default getRequest