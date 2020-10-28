// TODO: Add unit tests to graphQLQueries.js
const getUnquotedJson = (object) => {
    const json = JSON.stringify(object)
    return json.replace(/"([^"]+)":/g, '$1:');
}

export const getList = (resource, where, limit, offset, orderBy, properties) => `
query get_list_${resource}
{
    ${resource}_aggregate(where: ${where}) {
        aggregate {
            totalCount: count
        }
    }
    ${resource}(
        where: ${where},
        limit: ${limit},
        offset: ${offset},
        order_by: ${orderBy}
    ) {
        ${properties}
    }
}`

export const getMany = (resource, where, properties) => `
query get_many_${resource}
{
    ${resource}_aggregate(where: ${where}) {
        aggregate {
            totalCount: count
        }
    }
    ${resource}(
        where: ${where}
    ) {
        ${properties}
    }
}`

export const getOne = (resource, id, properties) => `
query get_one_${resource}
{
    ${resource}(
        where: {
            id: {_eq: ${id} }
        }
    ) {
        ${properties}
    }
}`

export const update = (resource, id, propertiesMap) => {
    const propertyNames = Object.keys(propertiesMap)
    return `
mutation update_${resource}{
    update_${resource}(
        where: { 
            id: { _eq: ${id} } 
        }
        _set: ${getUnquotedJson(propertiesMap)}
    ){
        returning {
            ${propertyNames}
        }
    }
}`
}

export const updateMany = (resource, ids, propertiesMap) => {
    const propertyNames = Object.keys(propertiesMap)
    return `
mutation update_many_${resource}{
    update_${resource}(
        where: { 
            id: { _in: [${ids}] } 
        }
        _set: ${getUnquotedJson(propertiesMap)}
    ){
        returning {
            ${propertyNames}
        }
    }
}`
}

export const create = (resource, propertiesMap) => {
    let propertyNames = Object.keys(propertiesMap)
    propertyNames.push('id')
    return `
mutation insert_${resource}{
    insert_${resource}(
        objects: ${getUnquotedJson(propertiesMap)}
    ){
        returning {
            ${propertyNames}
        }
    }
}`
}

export const bulkCreate = (resource, objects) => {
    let propertyNames = Object.keys(objects[0])
    propertyNames.push('id')
    return `
mutation insert_${resource}{
    insert_${resource}(
        objects: [${objects.map(element => getUnquotedJson(element)).toString()}]
    ){
        returning {
            ${propertyNames}
        }
    }
}`
}