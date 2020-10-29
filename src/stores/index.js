import React from 'react';
import Store from '@material-ui/icons/Store';
import StoreList from './StoreList';

export const RESOURCE_PROPERTIES = `
    id
    name
    active
`

const stores = {
    list: StoreList,
    icon: () => <div id='store-icon'><Store/></div>
}

export default stores
