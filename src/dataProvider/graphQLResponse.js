import { CREATE, GET_LIST, GET_MANY, GET_ONE, UPDATE, UPDATE_MANY } from "react-admin";
import CustomError, { ERROR_TYPES } from "../util/CustomError";

// TODO fix locale for dates
export const getDefaultGraphQLResponse = (type, resource, responseData) => {
    let response
    switch (type) {
        case GET_LIST:
            response = {
                data: responseData.data[resource],
                total: responseData.data[`${resource}_aggregate`].aggregate.totalCount
            }
            break;
        case GET_MANY:
            response = {
                data: responseData.data[resource],
                total: responseData.data[`${resource}_aggregate`].aggregate.totalCount
            }
            break;
        case GET_ONE:
            response = {
                data: responseData.data[resource][0]
            }
            break;
        case UPDATE:
            response = {
                data: responseData.data[`update_${resource}`].returning[0]
            }
            break;
        case UPDATE_MANY:
            const updatedIds = responseData.data[`update_${resource}`].returning.map((item) => {
                return item.id;
            })
            response = {
                data: updatedIds
            }
            break;
        case CREATE:
            response = {
                data: responseData.data[`insert_${resource}`].returning[0]
            }
            break;
        default:
            throw new CustomError(ERROR_TYPES.METHOD_RESPONSE_NOT_IMPLEMENTED, `Method ${type} not implemented`)
    }
    return response
}