import { 
    CREATE,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY
} from "react-admin";
import CustomError, { ERROR_TYPES } from "../util/CustomError";
import { getGraphQLResource } from "./resources";

// TODO fix locale for dates
export const getDefaultGraphQLResponse = (type, resource, responseData) => {
    let response
    const graphQLResource = getGraphQLResource(resource)
    switch (type) {
        case GET_LIST:
        case GET_MANY:
        case GET_MANY_REFERENCE:
            response = {
                data: responseData.data[graphQLResource],
                total: responseData.data[`${graphQLResource}_aggregate`].aggregate.totalCount
            }
            break;
        case GET_ONE:
            response = {
                data: responseData.data[graphQLResource][0]
            }
            break;
        case UPDATE:
            response = {
                data: responseData.data[`update_${graphQLResource}`].returning[0]
            }
            break;
        case UPDATE_MANY:
            const updatedIds = responseData.data[`update_${graphQLResource}`].returning.map((item) => {
                return item.id;
            })
            response = {
                data: updatedIds
            }
            break;
        case CREATE:
            response = {
                data: responseData.data[`insert_${graphQLResource}`].returning[0]
            }
            break;
        case DELETE:
            response = {
                data: responseData.data[`delete_${graphQLResource}`].returning[0]
            }
            break;
        case DELETE_MANY:
            const deletedIds = responseData.data[`delete_${graphQLResource}`].returning.map((item) => {
                return item.id;
            })
            response = {
                data: deletedIds
            }
            break;
        default:
            throw new CustomError(ERROR_TYPES.METHOD_RESPONSE_NOT_IMPLEMENTED, `Method ${type} not implemented`)
    }
    return response
}