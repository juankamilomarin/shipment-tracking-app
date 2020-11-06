export const ILIKE_FILTER_PREFIX = '__ilike_'
const getDefaultFilters = (filterObject) => {
    let filters = ''
    if(filterObject){
        const columnNames = Object.keys(filterObject)
        for (let i = 0; i < columnNames.length; i++) {
            let filterOperation, filterName, filterValue
            if(columnNames[i].startsWith(ILIKE_FILTER_PREFIX)) {
                filterOperation = '_ilike'
                filterName = columnNames[i].substr(ILIKE_FILTER_PREFIX.length)
                filterValue = `"%${filterObject[columnNames[i]]}%"`
            } else {
                filterOperation = '_eq'
                filterName = columnNames[i]
                filterValue = typeof filterObject[columnNames[i]] === 'string' ? `"${filterObject[columnNames[i]]}"` : filterObject[columnNames[i]]
            }
            const filter = `${filterName}: { ${filterOperation}: ${filterValue} },`
            filters = filters.concat(filter)
        }
    }
    return filters
}

export default getDefaultFilters