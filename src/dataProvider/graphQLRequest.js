import getSessionToken from "../authProvider/getSessionToken"
import getQuery from "./getQuery"

export const getGraphQLRequest = async (operationName, query) => {
    let authorizationToken = await getSessionToken()

    let dataQuery = { operationName, query }
    const headers = { 
        'content-type': 'application/json',
        'Authorization': authorizationToken
    }
    const request = { 
        method: 'POST',
        headers,
        body: JSON.stringify(dataQuery)
    }
    return request
}

export const getDefaultGraphQLRequest = async (type, resource, params) => {
    const [operationName, query] = getQuery(type, resource, params)
    return await getGraphQLRequest(operationName, query)
}