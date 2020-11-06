import React from 'react';
import { Create, TextInput, SimpleForm, DateInput } from 'react-admin';

const validateCreation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = { message: 'common.validation.required', args: { fieldName: 'name' } }
    }
    if (!values.opening_date) {
        errors.opening_date = { message: 'common.validation.required', args: { fieldName: 'opening_date' } }
    }
    return errors
}

const ParcelTitle = () => {
    return <span>{`Create Parcel`}</span>;
};

const ParcelCreate = props => (
    <Create title={<ParcelTitle />} {...props}>
        <SimpleForm submitOnEnter={false} validate={validateCreation} redirect="list">
            <TextInput source="name" id='parcel-create-name-input' />
            <DateInput source="opening_date" id='parcel-create-opening_date-input' defaultValue={new Date()}/>
        </SimpleForm>
    </Create>
);

export default ParcelCreate