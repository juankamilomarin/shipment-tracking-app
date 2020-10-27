import { PROPERTIES as COURIER_PROPERTIES } from '../couriers/resource'

// -------------- Resources
export const COURIER = 'courier'

// -------------- Properties
export const getResourceProperties = (resource) => {
    switch (resource) {
        case COURIER:
            return COURIER_PROPERTIES
        default:
            throw new Error(`Unsupported resource ${resource}`);
      };
}