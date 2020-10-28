// TODO: Implement i8n provider
// TODO: Implement a theme
// TODO: Add more resources
// TODO: Implement login page
// TODO: Implement toggle router
// TODO: Implement authentication
// TODO: Add Google Analytics

import React from 'react';
import { Admin, Resource } from 'react-admin';

import customDataProvider from './dataProvider/customDataProvider';

import couriers from './couriers';
import { COURIER } from './dataProvider/resources'

const resources = [
    <Resource name={COURIER} {...couriers}/>,
]

const App = () => (
    <Admin dataProvider={customDataProvider}>
        {resources}
    </Admin>
)

export default App;