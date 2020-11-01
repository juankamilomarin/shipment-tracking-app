import React from 'react';
import { Create, BooleanInput, TextInput, SimpleForm } from 'react-admin';

const validateCreation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = { message: 'common.validation.required', args: { fieldName: 'name' } }
    }
    return errors
}

const CourierTitle = () => {
    return <span>{`Create Courier`}</span>;
};

const CourierCreate = props => (
    <Create title={<CourierTitle />} {...props}>
        <SimpleForm submitOnEnter={false} validate={validateCreation} redirect="list">
            <TextInput source="name" id='courier-create-name-input' />
            <BooleanInput label="Active" source="active" id='courier-create-active-input' defaultValue={true} disabled={true} />
        </SimpleForm>
    </Create>
);

export default CourierCreate