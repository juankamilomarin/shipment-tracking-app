import React from 'react';
import LocalShipping from '@material-ui/icons/LocalShipping';
import CourierList from './CourierList';

const couriers = {
    list: CourierList,
    icon: () => <div id='courier-icon'><LocalShipping/></div>
}

export default couriers
