import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import OrderList from './OrderList';
import OrderEdit from './OrderEdit';
import OrderCreate from './OrderCreate';

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
    list: OrderList,
    edit: OrderEdit,
    create: OrderCreate,
    icon: () => <div id='order-icon'><AssignmentIcon/></div>
}

export default stores
