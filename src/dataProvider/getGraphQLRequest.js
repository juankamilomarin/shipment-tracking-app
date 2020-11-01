const getGraphQLRequest = async (operationName, query) => {    
    const headers = { 
        'content-type': 'application/json'
    }
    let dataQuery = { operationName, query };
    const request = { 
        method: 'POST',
        headers,
        body: JSON.stringify(dataQuery)
    }
    return request
}

export default getGraphQLRequest