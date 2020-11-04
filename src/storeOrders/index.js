import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StoreOrderList from './StoreOrderList';
import StoreOrderEdit from './StoreOrderEdit';
import StoreOrderCreate from './StoreOrderCreate';

export const RESOURCE_PROPERTIES = `
    id
    parcel_id
    item_name
    store_id
    cost
    weight
    order_date
    courier_id
    tracking_id
    shipping_date
    delivery_date
`

const stores = {
    list: StoreOrderList,
    edit: StoreOrderEdit,
    create: StoreOrderCreate,
    icon: () => <div id='store_order-icon'><AssignmentIcon/></div>
}

export default stores
