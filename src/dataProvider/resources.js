import { RESOURCE_PROPERTIES as COURIER_PROPERTIES } from '../couriers'
import { RESOURCE_PROPERTIES as STORE_PROPERTIES } from '../stores'
import { RESOURCE_PROPERTIES as PARCEL_PROPERTIES } from '../parcels'
import { RESOURCE_PROPERTIES as STORE_ORDER_PROPERTIES } from '../storeOrders'

// -------------- Resources
export const COURIER = 'courier'
export const STORE = 'store'
export const PARCEL = 'parcel'
export const STORE_ORDER = 'store_order'

// -------------- Properties
export const getResourceProperties = (resource) => {
    switch (resource) {
        case COURIER:
            return COURIER_PROPERTIES
        case STORE:
            return STORE_PROPERTIES
        case PARCEL:
            return PARCEL_PROPERTIES
        case STORE_ORDER:
            return STORE_ORDER_PROPERTIES
        default:
            throw new Error(`Unsupported resource ${resource}`);
      };
}