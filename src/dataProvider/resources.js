import { RESOURCE_PROPERTIES as COURIER_PROPERTIES } from '../couriers'
import { RESOURCE_PROPERTIES as STORE_PROPERTIES } from '../stores'

// -------------- Resources
export const COURIER = 'courier'
export const STORE = 'store'

// -------------- Properties
export const getResourceProperties = (resource) => {
    switch (resource) {
        case COURIER:
            return COURIER_PROPERTIES
        case STORE:
            return STORE_PROPERTIES
        default:
            throw new Error(`Unsupported resource ${resource}`);
      };
}