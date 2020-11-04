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

import couriers from './couriers'
import stores from './stores'
import parcels from './parcels'
import { COURIER, STORE, PARCEL } from './dataProvider/resources'

const resources = [
    <Resource name={COURIER} {...couriers} key={`${COURIER}-resource`}/>,
    <Resource name={STORE} {...stores} key={`${STORE}-resource`}/>,
    <Resource name={PARCEL} {...parcels} key={`${PARCEL}-resource`}/>,
]

const App = () => (
    <Admin dataProvider={customDataProvider}>
        {resources}
    </Admin>
)

export default App;