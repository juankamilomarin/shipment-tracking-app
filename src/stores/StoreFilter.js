import React from 'react';
import { Filter, BooleanInput } from 'react-admin';

const StoreFilter = (props) => (
    <Filter id='store-filter' {...props}>
        <BooleanInput label="Active" source="active" alwaysOn options={{ id: 'store-active-filter'}}/>
    </Filter>
);

export default StoreFilter