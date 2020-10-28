// TODO: Add unit tests to CourierFilter.js
import React from 'react';
import { Filter, BooleanInput } from 'react-admin';

const CourierFilter = (props) => (
    <Filter {...props}>
        <BooleanInput label="Active" source="active" alwaysOn />
    </Filter>
);

export default CourierFilter