import getDefaultFilters from './getDefaultFilters';
import { ILIKE_FILTER_PREFIX } from './getDefaultFilters'

describe("getDefaultFilters", () => {
    const getIlikeProperty = (propertyName) => `${ILIKE_FILTER_PREFIX + propertyName}`

    it("should return concatenated filters for simple filters", () => {
        const testFilters = { 
            filter1: 'filter 1',
            filter2: true,
        }
        const actualFilters = getDefaultFilters(testFilters)
        const expectedFilters = 'filter1: { _eq: "filter 1" },filter2: { _eq: true },'
        expect(actualFilters).toStrictEqual(expectedFilters)
    });

    it("should return concatenated filters for ilike types", () => {
        const testFilters = { 
            filter1: 'filter 1',
            [`${getIlikeProperty('filter2')}`]: 'ilike type filter'
        }
        const actualFilters = getDefaultFilters(testFilters)
        const expectedFilters = 'filter1: { _eq: "filter 1" },filter2: { _ilike: "%ilike type filter%" },'
        expect(actualFilters).toStrictEqual(expectedFilters)
    });

    it("should return empty string if no filters are provided", () => {
        const testFilters = { }
        const actualFilters = getDefaultFilters(testFilters)
        const expectedFilters = ''
        expect(actualFilters).toStrictEqual(expectedFilters)
    });

    it("should return empty string if filters object is not present", () => {
        const actualFilters = getDefaultFilters(undefined)
        const expectedFilters = ''
        expect(actualFilters).toStrictEqual(expectedFilters)
    });

});