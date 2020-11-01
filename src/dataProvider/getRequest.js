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
import CustomError, { ERROR_TYPES } from '../util/CustomError'
import checkMethodType from './checkMethodType'
import getGraphQLRequest from './getGraphQLRequest'
import getDefaultFilters from './getDefaultFilters'

const getListDefaultRequest = async (resource, params) => {
    const limit = params.pagination.perPage;
    const offset = (params.pagination.page * params.pagination.perPage) - params.pagination.perPage;
    const orderBy = params.sort.field? `{${params.sort.field}: ${params.sort.order === 'undefined' ? 'asc' : params.sort.order.toLowerCase()}}` : "{}"
    const filters = !params.filter ? '' : getDefaultFilters(params.filter)
    const where = `{ ${filters} }`
    const properties = getResourceProperties(resource)
    const [operationName, query] = getList(resource, where, limit, offset, orderBy, properties)
    return await getGraphQLRequest(operationName, query)
}

const getManyDefaultRequest = async (resource, params) => {
    const filters = !params.filter ? '' : getDefaultFilters(params.filter)
    const where = `{ ${filters.concat(`id: { _in: [${params.ids}`)}] } }`
    const properties = getResourceProperties(resource)
    const [operationName, query] = getMany(resource, where, properties)
    return await getGraphQLRequest(operationName, query)
}

const getOneDefaultRequest = async (resource, params) => {
    const  properties = getResourceProperties(resource)
    const [operationName, query] = getOne(resource, params.id, properties)
    return await getGraphQLRequest(operationName, query)
}

const updateDefaultRequest = async (resource, params) => {
    const [operationName, query] = update(resource, params.id, params.data)
    return await getGraphQLRequest(operationName, query)
}

const updateManyDefaultRequest = async (resource, params) => {
    const [operationName, query] = updateMany(resource, params.ids, params.data)
    return await getGraphQLRequest(operationName, query)
}

const createDefaultRequest = async (resource, params) => {
    const [operationName, query] = create(resource, params.data)
    return await getGraphQLRequest(operationName, query)
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

const checkRequestImplementation = (type) => {
    if(!REQUEST_METHODS[type]) throw new CustomError(ERROR_TYPES.METHOD_REQUEST_NOT_IMPLEMENTED, `Method ${type} request is not implemented`);
}

const getRequest = async (type, resource, params) => {
    checkMethodType(type)
    checkRequestImplementation(type)
    if(REQUEST_METHODS[type][resource]) return await REQUEST_METHODS[type][resource](params)
    return await REQUEST_METHODS[type][DEFAULT](resource, params)
}

export default getRequest