// TODO: Add unit tests to CourierList.js
import React from 'react';
import { List, Datagrid, TextField, BooleanField } from 'react-admin';
import CourierFilter from './CourierFilter';

const CourierList = (props) => {
    const defaultFilters = { 
        active: true
    }
    return (
        <List filters={<CourierFilter />} filterDefaultValues={defaultFilters} bulkActionButtons={ false } {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <BooleanField source="active" />
            </Datagrid>
        </List>
    );
}

export default CourierList