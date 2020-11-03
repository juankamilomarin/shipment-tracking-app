import React from 'react';
import Store from '@material-ui/icons/Store';
import StoreList from './StoreList';
import StoreEdit from './StoreEdit';
import StoreCreate from './StoreCreate';

export const RESOURCE_PROPERTIES = `
    id
    name
    active
`

const stores = {
    list: StoreList,
    edit: StoreEdit,
    create: StoreCreate,
    icon: () => <div id='store-icon'><Store/></div>
}

export default stores
