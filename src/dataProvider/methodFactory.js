// TODO: Split logic inside this file
// TODO: Add unit tests to methodFactory.js
import { getList, getMany, getOne, update, updateMany, create } from './graphQLQueries'
import {
    GET_LIST,
    GET_MANY,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
    CREATE
} from 'react-admin'
import { getResourceProperties  } from './resources'
import CustomError from '../common/CustomError'
import { ERROR_TYPES } from '../common/CustomError'
import checkMethodType from './checkMethodType'

export const getGraphQLRequest = async (query) => {    
    const headers = { 
        'content-type': 'application/json'
    }
    let dataQuery = { query };
    const request = { 
        method: 'POST',
        headers,
        body: JSON.stringify(dataQuery)
    }
    return request
}

const ILIKE_FILTER_PREFIX = '__ilike_'
export const getIlikeProperty = (propertyName) => `${ILIKE_FILTER_PREFIX + propertyName}`
export const getDefaultFilters = (filterObject) => {
    let filters = ''
    const columnNames = Object.keys(filterObject)
    for (let i = 0; i < columnNames.length; i++) {
        let filterOperation, filterName, filterValue
        if(columnNames[i].startsWith(ILIKE_FILTER_PREFIX)) {
            filterOperation = '_ilike'
            filterName = columnNames[i].substr(ILIKE_FILTER_PREFIX.length)
            filterValue = `"%${filterObject[columnNames[i]]}%"`
        } else {
            filterOperation = '_eq'
            filterName = columnNames[i]
            filterValue = typeof filterObject[columnNames[i]] === 'string' ? `"${filterObject[columnNames[i]]}"` : filterObject[columnNames[i]]
        }
        const filter = `${filterName}: { ${filterOperation}: ${filterValue} },`
        filters = filters.concat(filter)
    }
    return filters
}

export const removeFilters = (filterObject, filters) => {
    const newFilterObject = JSON.parse(JSON.stringify(filterObject))
    filters.forEach(filter => {
        delete newFilterObject[filter]
    })
    return newFilterObject
}

const getListDefaultRequest = async (resource, params) => {
    const limit = params.pagination.perPage;
    const offset = (params.pagination.page * params.pagination.perPage) - params.pagination.perPage;
    const orderBy = params.sort.field? `{${params.sort.field}: ${params.sort.order === 'undefined' ? 'asc' : params.sort.order.toLowerCase()}}` : "{}"
    const filters = !params.filter ? '' : getDefaultFilters(params.filter)
    const where = `{ ${filters} }`
    const properties = getResourceProperties(resource)
    const query = getList(resource, where, limit, offset, orderBy, properties)
    return await getGraphQLRequest(query)
}

const getManyDefaultRequest = async (resource, params) => {
    const filters = !params.filter ? '' : getDefaultFilters(params.filter)
    const where = `{ ${filters.concat(`id: { _in: [${params.ids}`)}] } }`
    const properties = getResourceProperties(resource)
    const query = getMany(resource, where, properties)
    return await getGraphQLRequest(query)
}

const getOneDefaultRequest = async (resource, params) => {
    const  properties = getResourceProperties(resource)
    const query = getOne(resource, params.id, properties)
    return await getGraphQLRequest(query)
}

const updateDefaultRequest = async (resource, params) => {
    const query = update(resource, params.id, params.data)
    return await getGraphQLRequest(query)
}

const updateManyDefaultRequest = async (resource, params) => {
    const query = updateMany(resource, params.ids, params.data)
    return await getGraphQLRequest(query)
}

const createDefaultRequest = async (resource, params) => {
    const query = create(resource, params.data)
    return await getGraphQLRequest(query)
}

const DEFAULT = 'DEFAULT'
const REQUEST_METHODS = {
    [GET_LIST]: {
        [DEFAULT]: getListDefaultRequest,
    },
    [GET_MANY]: {
        [DEFAULT]: getManyDefaultRequest,
    },
    [GET_ONE]: {
        [DEFAULT]: getOneDefaultRequest,
    },
    [UPDATE]: {
        [DEFAULT]: updateDefaultRequest,
    },
    [UPDATE_MANY]: {
        [DEFAULT]: updateManyDefaultRequest,
    },
    [CREATE]: {
        [DEFAULT]: createDefaultRequest,
    },
}

export const checkRequestImplementation = (type) => {
    if(!REQUEST_METHODS[type]) throw new CustomError(ERROR_TYPES.METHOD_REQUEST_NOT_IMPLEMENTED, `Method ${type} request is not implemented`);
}

export const getRequest = async (type, resource, params) => {
    checkMethodType(type)
    checkRequestImplementation(type)
    // Return custom request in case it exists for the given resource
    if(REQUEST_METHODS[type][resource]) return await REQUEST_METHODS[type][resource](params)
    return await REQUEST_METHODS[type][DEFAULT](resource, params)
}

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

export const checkResponseImplementation = (type) => {
    if(!RESPONSE_METHODS[type]) throw new CustomError(ERROR_TYPES.METHOD_RESPONSE_NOT_IMPLEMENTED, `Method ${type} response is not implemented`);
}

export const checkResponseError = (response, resource) => {
    if ('errors' in response) throw new CustomError(ERROR_TYPES.RESPONSE_ERROR, 'Response error', response, resource)
}

export const getResponse = (responseData, type, resource) => {
    checkMethodType(type)
    checkResponseImplementation(type)
    checkResponseError(responseData, resource)
    // Return custom response in case it exists for the given resource
    const response = (RESPONSE_METHODS[type][resource]) ? RESPONSE_METHODS[type][resource](responseData) : RESPONSE_METHODS[type][DEFAULT](resource, responseData)
    return response
}