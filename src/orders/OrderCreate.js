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
import { parse } from 'query-string';

// TODO improve validations
const validateCreation = (values) => {
    const errors = {};
    if (!values.item_name) {
        errors.item_name = { message: 'common.validation.required', args: { fieldName: 'item_name' } }
    }
    return errors
}

const OrderTitle = () => {
    return <span>{`Create Order`}</span>;
};

const OrderCreate = props => {
    const { parcel_id: parcel_id_string } = parse(props.location.search);
    let parcel_id = '',
        redirect = 'list', 
        disableParcelInput = false
    if(parcel_id_string){
        parcel_id = parseInt(parcel_id_string, 10)
        redirect = `/parcel/${parcel_id}/show/order`
        disableParcelInput = true
    }
    return (
        <Create title={<OrderTitle />} {...props}>
            <SimpleForm 
                submitOnEnter={false}
                defaultValue={{ parcel_id }}
                validate={validateCreation}
                redirect={redirect}
            >
                <TextInput source="item_name" id='order-create-item_name-input' />
                <ReferenceInput source="parcel_id" reference="parcel" >
                    <SelectInput source="name" disabled={disableParcelInput} />
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
    )
};

export default OrderCreate