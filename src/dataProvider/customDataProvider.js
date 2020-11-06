import getResponse from './getResponse'
import getRequest from './getRequest'
import { DateTime } from 'luxon'
import { GET_LIST, GET_MANY, GET_ONE } from 'react-admin'

const addExpirationDate = (response) => {
    const expirationDate = DateTime.local().plus({ days: 1 })
    response.validUntil = expirationDate
    return response
}

// IMPORTANT: Cache does not work when using filters which use ReferenceInput.
// This was reported to react admin team (https://github.com/marmelab/react-admin/issues/4682)
const cacheResponse = (response, type) => {
    // Application cache is only supported for these methods. More info in https://marmelab.com/react-admin/Caching.html#application-cache
    if(type === GET_ONE || type === GET_LIST || type === GET_MANY){
        return addExpirationDate(response)
    }
    return response
}

const getRequestPromise = (type, resource, params) => { 
    const serverEndpoint = window.config.hasura.endpoint + '/v1/graphql'
    return getRequest(type, resource, params).then(request => 
            fetch(serverEndpoint, request).then(async graphQLResponse => {
                const data = await graphQLResponse.json()
                const dataAdminReponse = getResponse(data, type, resource)
                return cacheResponse(dataAdminReponse, type)
            })
        ).catch(error => Promise.reject({ message: error.message, ...error }))
}

const customDataProvider = (type, resource, params) => {
    return getRequestPromise(type, resource, params)
}

export default customDataProvider
