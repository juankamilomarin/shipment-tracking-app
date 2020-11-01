import React from 'react';
import LocalShipping from '@material-ui/icons/LocalShipping';
import CourierList from './CourierList';
import CourierEdit from './CourierEdit'
import CourierCreate from './CourierCreate'

export const RESOURCE_PROPERTIES = `
    id
    name
    active
`

const couriers = {
    list: CourierList,
    edit: CourierEdit,
    create: CourierCreate,
    icon: () => <div id='courier-icon'><LocalShipping/></div>
}

export default couriers
