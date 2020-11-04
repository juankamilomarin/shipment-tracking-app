import React from 'react';
import { List, Datagrid, TextField, EditButton, DateField } from 'react-admin';

const ParcelList = (props) => {
    return (
        <List id='parcel-list' bulkActionButtons={ false } {...props}>
            <Datagrid id='parcel-table'>
                <TextField source="id"/>
                <TextField source="name" />
                <DateField source="opening_date" />
                <DateField source="closing_date" />
                <EditButton id='parcel-list-edit' />
            </Datagrid>
        </List>
    );
}

export default ParcelList