// TODO: Implement i8n provider
// TODO: Implement a theme
// TODO: Add more resources
// TODO: Add custom pagination
// TODO: Implement login page
// TODO: Implement toggle router
// TODO: Implement authentication
// TODO: Add Google Analytics

import React from 'react';
import { Admin, Resource } from 'react-admin';

import customDataProvider from './dataProvider/customDataProvider';
import theme from './design/theme';

import couriers from './couriers'
import stores from './stores'
import parcels from './parcels'
import storeOrders from './storeOrders'
import { COURIER, STORE, PARCEL, STORE_ORDER } from './dataProvider/resources'

const resources = [
    <Resource name={COURIER} {...couriers} key={`${COURIER}-resource`}/>,
    <Resource name={STORE} {...stores} key={`${STORE}-resource`}/>,
    <Resource name={PARCEL} {...parcels} key={`${PARCEL}-resource`}/>,
    <Resource name={STORE_ORDER} {...storeOrders} key={`${STORE_ORDER}-resource`}/>,
]

const App = () => (
    <Admin 
        dataProvider={customDataProvider}
        theme={theme}
    >
        {resources}
    </Admin>
)

export default App;