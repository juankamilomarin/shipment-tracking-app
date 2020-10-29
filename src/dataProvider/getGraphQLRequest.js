const getGraphQLRequest = async (query) => {    
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

export default getGraphQLRequest