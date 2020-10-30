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

const getAllResponse = (resource, response) => {
    return {
        data: response.data[resource],
        total: response.data[`${resource}_aggregate`].aggregate.totalCount
    }
}

const getListDefaultResponse = (resource, response) => getAllResponse(resource, response)

const getManyDefaultResponse = (resource, response) => getAllResponse(resource, response)

const getOneDefaultResponse = (resource, response) => {
    return {
        data: response.data[resource][0]
    }
}

const updateDefaultResponse = (resource, response) => {
    return {
        data: response.data[`update_${resource}`].returning[0]
    }
}

const updateManyDefaultResponse = (resource, response) => {
    const updatedIds = response.data[`update_${resource}`].returning.map((item) => {
        return item.id;
    });

    return {
        data: updatedIds
    }
}

const createDefaultResponse = (resource, response) => {
    return {
        data: response.data[`insert_${resource}`].returning[0]
    }
}
const DEFAULT = 'DEFAULT'
const RESPONSE_METHODS = {
    [GET_LIST]: {
        [DEFAULT]: getListDefaultResponse,
    },
    [GET_MANY]: {
        [DEFAULT]: getManyDefaultResponse,
    },
    [GET_ONE]: {
        [DEFAULT]: getOneDefaultResponse,
    },
    [UPDATE]: {
        [DEFAULT]: updateDefaultResponse,
    },
    [UPDATE_MANY]: {
        [DEFAULT]: updateManyDefaultResponse,
    },
    [CREATE]: {
        [DEFAULT]: createDefaultResponse,
    },
}

const checkResponseImplementation = (type) => {
    if(!RESPONSE_METHODS[type]) throw new CustomError(ERROR_TYPES.METHOD_RESPONSE_NOT_IMPLEMENTED, `Method ${type} response is not implemented`);
}

const checkResponseError = (response, resource) => {
    if ('errors' in response) throw new CustomError(ERROR_TYPES.RESPONSE_ERROR, 'Response error', response, resource)
}

const getResponse = (responseData, type, resource) => {
    checkMethodType(type)
    checkResponseImplementation(type)
    checkResponseError(responseData, resource)
    const response = (RESPONSE_METHODS[type][resource]) ? RESPONSE_METHODS[type][resource](responseData) : RESPONSE_METHODS[type][DEFAULT](resource, responseData)
    return response
}

export default getResponse