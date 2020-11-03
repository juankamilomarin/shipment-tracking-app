import getQuery from "./getQuery"

export const getGraphQLRequest = (operationName, query) => {
    let dataQuery = { operationName, query }
    const headers = { 
        'content-type': 'application/json'
    }
    const request = { 
        method: 'POST',
        headers,
        body: JSON.stringify(dataQuery)
    }
    return request
}

export const getDefaultGraphQLRequest = (type, resource, params) => {
    const [operationName, query] = getQuery(type, resource, params)
    return getGraphQLRequest(operationName, query)
}