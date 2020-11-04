import React from 'react';
import { TextField, Edit, TextInput, SimpleForm, DateInput } from 'react-admin';

const ParcelTitle = ({ record }) => {
    return <span>{`Edit Parcel - "${record.name}"`}</span>;
};

const ParcelEdit = props => (
    <Edit title={<ParcelTitle />} undoable={false} {...props}>
        <SimpleForm submitOnEnter={false} redirect="list">
            <TextField source="id" />
            <TextInput source="name" />
            <DateInput source="opening_date" />
            <DateInput source="closing_date" />
        </SimpleForm>
    </Edit>
);

export default ParcelEdit