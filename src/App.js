import React from 'react';
import { Admin, Resource } from 'react-admin';

import customDataProvider from './dataProvider/customDataProvider';

import couriers from './couriers';
import { COURIER } from './dataProvider/resources'

const resources = [
    <Resource name={COURIER} {...couriers} key={COURIER}/>,
]

const App = () => (
  <Admin dataProvider={customDataProvider}>
      {resources}
  </Admin>
)

export default App;