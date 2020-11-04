import React from 'react';
import { 
    Create,
    TextInput,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    NumberInput,
    DateInput
} from 'react-admin';

// TODO improve validations
const validateCreation = (values) => {
    const errors = {};
    if (!values.item_name) {
        errors.item_name = { message: 'common.validation.required', args: { fieldName: 'item_name' } }
    }
    return errors
}

const StoreOrderTitle = () => {
    return <span>{`Create StoreOrder`}</span>;
};

const StoreOrderCreate = props => (
    <Create title={<StoreOrderTitle />} {...props}>
        <SimpleForm submitOnEnter={false} validate={validateCreation} redirect="list">
            <TextInput source="item_name" id='store_order-create-item_name-input' />
            <ReferenceInput source="parcel_id" reference="parcel" >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="store_id" reference="store">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="cost" />
            <NumberInput source="weight" />
            <DateInput source="order_date" />
            <ReferenceInput source="courier_id" reference="courier"  filter={{ active: true }} >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput label="Tracking id" source="tracking_id"/>
            <DateInput source="shipping_date" />
            <DateInput source="delivery_date" />
        </SimpleForm>
    </Create>
);

export default StoreOrderCreate