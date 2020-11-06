const getUnquotedJson = (object) => {
    const json = JSON.stringify(object)
    return json.replace(/"([^"]+)":/g, '$1:');
}

export const getList = (resource, properties, queryArguments) => `
query get_list_${resource}
{
    ${resource}_aggregate(where: ${queryArguments.where}) {
        aggregate {
            totalCount: count
        }
    }
    ${resource}(
        where: ${queryArguments.where},
        limit: ${queryArguments.limit},
        offset: ${queryArguments.offset},
        order_by: ${queryArguments.orderBy}
    ) {
        ${properties}
    }
}`

export const getMany = (resource, properties, queryArguments) => `
query get_many_${resource}
{
    ${resource}_aggregate(where: ${queryArguments.where}) {
        aggregate {
            totalCount: count
        }
    }
    ${resource}(
        where: ${queryArguments.where}
    ) {
        ${properties}
    }
}`

export const getManyReference = (resource, properties, queryArguments) => `
query get_many_reference_${resource}
{
    ${resource}_aggregate(where: ${queryArguments.where}) {
        aggregate {
            totalCount: count
        }
    }
    ${resource}(
        where: ${queryArguments.where},
        limit: ${queryArguments.limit},
        offset: ${queryArguments.offset},
        order_by: ${queryArguments.orderBy}
    ) {
        ${properties}
    }
}`

export const getOne = (resource, properties, id) => `
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

export const update = (resource, id, data) => {
    const propertyNames = Object.keys(data)
    return `
mutation update_${resource}{
    update_${resource}(
        where: { 
            id: { _eq: ${id} } 
        }
        _set: ${getUnquotedJson(data)}
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

export const insert = (resource, propertiesMap) => {
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

export const deleteQuery = (resource, id) => {
    return `
mutation delete_${resource}{
    delete_${resource}(
        where: { 
            id: { _eq: ${id} } 
        }
    ){
        returning {
            id
        }
    }
}`
}

export const deleteMany = (resource, ids) => {
    return `
mutation delete_many_${resource}{
    delete_${resource}(
        where: { 
            id: { _in: [${ids}] } 
        }
    ){
        returning {
            id
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