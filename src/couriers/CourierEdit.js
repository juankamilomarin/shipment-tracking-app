import React from 'react';
import { TextField, Edit, BooleanInput, TextInput, SimpleForm } from 'react-admin';

const CourierTitle = ({ record }) => {
    return <span>{`Edit Courier - "${record.name}"`}</span>;
};

const CourierEdit = props => (
    <Edit title={<CourierTitle />} undoable={false} {...props}>
        <SimpleForm submitOnEnter={false} redirect="list">
            <TextField source="id" />
            <TextInput source="name" />
            <BooleanInput label="Active" source="active" />
        </SimpleForm>
    </Edit>
);

export default CourierEdit