import { getRequest, getResponse } from './methodFactory'

const getPromiseRequest = (type, resource, params) => { 
    const serverEndpoint = window.config.hasura.endpoint + '/v1/graphql'
    return getRequest(type, resource, params).then(request => 
            fetch(serverEndpoint, request).then(async response => {
                const data = await response.json()
                return getResponse(data, type, resource)
            })
        ).catch(error => Promise.reject({ message: error.message, ...error }))
}

const customDataProvider = (type, resource, params) => {
    return getPromiseRequest(type, resource, params)
}

export default customDataProvider
