// TODO Add show screen and tabs to update store orders from here
import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ParcelList from './ParcelList';
import ParcelEdit from './ParcelEdit';
import ParcelCreate from './ParcelCreate';

export const RESOURCE_PROPERTIES = `
    id
    name
    opening_date
    closing_date
`

const stores = {
    list: ParcelList,
    edit: ParcelEdit,
    create: ParcelCreate,
    icon: () => <div id='parcel-icon'><AssignmentIcon/></div>
}

export default stores
