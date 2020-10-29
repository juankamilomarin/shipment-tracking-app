import React from 'react';
import LocalShipping from '@material-ui/icons/LocalShipping';
import CourierList from './CourierList';

export const RESOURCE_PROPERTIES = `
    id
    name
    active
`

const couriers = {
    list: CourierList,
    icon: () => <div id='courier-icon'><LocalShipping/></div>
}

export default couriers
