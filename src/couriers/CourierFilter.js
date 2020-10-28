import React from 'react';
import { Filter, BooleanInput } from 'react-admin';

const CourierFilter = (props) => (
    <Filter id='courier-filter' {...props}>
        <BooleanInput label="Active" source="active" alwaysOn options={{ id: 'courier-active-filter'}}/>
    </Filter>
);

export default CourierFilter