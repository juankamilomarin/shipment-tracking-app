import React from 'react';
import AllInbox from '@material-ui/icons/AllInbox';
import ParcelList from './ParcelList';
import ParcelEdit from './ParcelEdit';
import ParcelCreate from './ParcelCreate';
import ParcelShow from './ParcelShow';

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
    show: ParcelShow,
    icon: () => <div id='parcel-icon'><AllInbox/></div>
}

export default stores
