import React from 'react';
import { Create, BooleanInput, TextInput, SimpleForm } from 'react-admin';

const validateCreation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = { message: 'common.validation.required', args: { fieldName: 'name' } }
    }
    return errors
}

const StoreTitle = () => {
    return <span>{`Create Store`}</span>;
};

const StoreCreate = props => (
    <Create title={<StoreTitle />} {...props}>
        <SimpleForm submitOnEnter={false} validate={validateCreation} redirect="list">
            <TextInput source="name" id='store-create-name-input' />
            <BooleanInput label="Active" source="active" id='store-create-active-input' defaultValue={true} disabled={true} />
        </SimpleForm>
    </Create>
);

export default StoreCreate