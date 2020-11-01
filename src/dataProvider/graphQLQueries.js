const getUnquotedJson = (object) => {
    const json = JSON.stringify(object)
    return json.replace(/"([^"]+)":/g, '$1:');
}

export const getList = (resource, where, limit, offset, orderBy, properties) => {
    const operationName = `get_list_${resource}`
    return [
        operationName,
        `query ${operationName}
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
    ]
}


export const getMany = (resource, where, properties) => {
    const operationName = `get_many_${resource}`
    return [
        operationName,
        `query ${operationName}
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
    ]
}

export const getOne = (resource, id, properties) => {
    const operationName = `get_one_${resource}`
    return [
        operationName,
        `query ${operationName}
        {
            ${resource}(
                where: {
                    id: {_eq: ${id} }
                }
            ) {
                ${properties}
            }
        }`
    ]
}

export const update = (resource, id, propertiesMap) => {
    const operationName = `update_${resource}`
    const propertyNames = Object.keys(propertiesMap)
    return [
        operationName,
        `mutation ${operationName}{
            ${operationName}(
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
    ]
}

export const updateMany = (resource, ids, propertiesMap) => {
    const operationName = `update_many_${resource}`
    const propertyNames = Object.keys(propertiesMap)
    return [
        operationName,
        `mutation ${operationName}{
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
    ]
}

export const create = (resource, propertiesMap) => {
    const operationName = `insert_${resource}`
    let propertyNames = Object.keys(propertiesMap)
    propertyNames.push('id')
    return [
        operationName,
        `mutation ${operationName}{
            ${operationName}(
                objects: ${getUnquotedJson(propertiesMap)}
            ){
                returning {
                    ${propertyNames}
                }
            }
        }`
    ]
}

export const bulkCreate = (resource, objects) => {
    const operationName = `bulk_create_${resource}`
    let propertyNames = Object.keys(objects[0])
    propertyNames.push('id')
    return [
        operationName,
        `mutation insert_${resource}{
            insert_${resource}(
                objects: [${objects.map(element => getUnquotedJson(element)).toString()}]
            ){
                returning {
                    ${propertyNames}
                }
            }
        }`
    ]
}