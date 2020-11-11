// TODO: Add custom pagination
// TODO: Add Google Analytics

import React from 'react';
import { Admin, Resource } from 'react-admin';
import customDataProvider from './dataProvider/customDataProvider';
import theme from './design/theme';
import i18nProvider from './i18nProvider/i18nProvider';
import FeatureFlagProvider from './featureFlags/FeatureFlagProvider';
import LoginPage from './design/LoginPage';
import authProvider from './authProvider/authProvider';
import { getActiveResources } from './featureFlags/toggleRouter';
import couriers from './couriers'
import stores from './stores'
import parcels from './parcels'
import orders from './orders'
import { COURIER, STORE, PARCEL, ORDER } from './dataProvider/resources'

const resources = [
    <Resource name={PARCEL} {...parcels} key={`${PARCEL}-resource`}/>,
    <Resource name={ORDER} {...orders} key={`${ORDER}-resource`}/>,
    <Resource name={COURIER} {...couriers} key={`${COURIER}-resource`}/>,
    <Resource name={STORE} {...stores} key={`${STORE}-resource`}/>,
]

const App = () => (
    <FeatureFlagProvider>
        <Admin 
            dataProvider={customDataProvider}
            theme={theme}
            i18nProvider={i18nProvider}
            authProvider={authProvider}
            loginPage={LoginPage}
        >
            {(permissions => getActiveResources(resources))}
        </Admin>
    </FeatureFlagProvider>
)

export default App;