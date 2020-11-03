import React from 'react';
import { TextField, Edit, BooleanInput, TextInput, SimpleForm } from 'react-admin';

const StoreTitle = ({ record }) => {
    return <span>{`Edit Store - "${record.name}"`}</span>;
};

const StoreEdit = props => (
    <Edit title={<StoreTitle />} undoable={false} {...props}>
        <SimpleForm submitOnEnter={false} redirect="list">
            <TextField source="id" />
            <TextInput source="name" />
            <BooleanInput label="Active" source="active" />
        </SimpleForm>
    </Edit>
);

export default StoreEdit