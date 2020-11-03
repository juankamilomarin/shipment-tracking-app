import { CREATE, GET_LIST, GET_MANY, GET_ONE, UPDATE, UPDATE_MANY } from "react-admin";
import CustomError, { ERROR_TYPES } from "../util/CustomError";
import getDefaultFilters from "./getDefaultFilters";
import { insert, getList, getMany, getOne, update, updateMany } from "./queries";
import { getResourceProperties } from "./resources";

const getListArguments = (params) => {
    const limit = params.pagination.perPage;
    const offset = (params.pagination.page * params.pagination.perPage) - params.pagination.perPage;
    const orderBy = params.sort.field? `{${params.sort.field}: ${params.sort.order === 'undefined' ? 'asc' : params.sort.order.toLowerCase()}}` : "{}"
    const filters = !params.filter ? '' : getDefaultFilters(params.filter)
    const where = `{ ${filters} }`
    return { limit, offset, orderBy, where }
}

const getManyArguments = (params) => {
    const filters = !params.filter ? '' : getDefaultFilters(params.filter)
    const where = `{ ${filters.concat(`id: { _in: [${params.ids}`)}] } }`
    return { where }
}

const getQuery = (type, resource, params) => {
    let operationName, query, queryArguments, properties
    switch (type) {
        case GET_LIST:
            operationName = `get_list_${resource}`
            properties = getResourceProperties(resource)
            queryArguments = getListArguments(params)
            query = getList(resource, properties, queryArguments)
            break;
        case GET_MANY:
            operationName = `get_many_${resource}`
            properties = getResourceProperties(resource)
            queryArguments = getManyArguments(params)
            query = getMany(resource, properties, queryArguments)
            break;
        case GET_ONE:
            operationName = `get_one_${resource}`
            properties = getResourceProperties(resource)
            query = getOne(resource, properties, params.id)
            break;
        case UPDATE:
            operationName = `update_${resource}`
            query = update(resource, params.id, params.data)
            break;
        case UPDATE_MANY:
            operationName = `update_many_${resource}`
            query = updateMany(resource, params.ids, params.data)
            break;
        case CREATE:
            operationName = `insert_${resource}`
            query = insert(resource, params.data)
            break;
        default:
            throw new CustomError(ERROR_TYPES.METHOD_REQUEST_NOT_IMPLEMENTED, `Method ${type} not implemented`)
    }
    return [operationName, query]
}

export default getQuery