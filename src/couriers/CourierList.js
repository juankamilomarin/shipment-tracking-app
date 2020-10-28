import React from 'react';
import { List, Datagrid, TextField, BooleanField } from 'react-admin';
import CourierFilter from './CourierFilter';

const CourierList = (props) => {
    const defaultFilters = { 
        active: true
    }
    return (
        <List id='courier-list' filters={<CourierFilter />} filterDefaultValues={defaultFilters} bulkActionButtons={ false } {...props}>
            <Datagrid id='courier-table'>
                <TextField source="id"/>
                <TextField source="name" />
                <BooleanField source="active" />
            </Datagrid>
        </List>
    );
}

export default CourierList