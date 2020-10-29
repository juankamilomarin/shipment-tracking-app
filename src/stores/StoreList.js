import React from 'react';
import { List, Datagrid, TextField, BooleanField } from 'react-admin';
import StoreFilter from './StoreFilter';

const StoreList = (props) => {
    const defaultFilters = { 
        active: true
    }
    return (
        <List id='store-list' filters={<StoreFilter />} filterDefaultValues={defaultFilters} bulkActionButtons={ false } {...props}>
            <Datagrid id='store-table'>
                <TextField source="id"/>
                <TextField source="name" />
                <BooleanField source="active" />
            </Datagrid>
        </List>
    );
}

export default StoreList