import React from 'react';
import { 
    TextField,
    Edit,
    TextInput,
    SimpleForm,
    DateInput,
    ReferenceInput,
    NumberInput,
    SelectInput
} from 'react-admin';
import { parse } from 'query-string';

const OrderTitle = ({ record }) => {
    return <span>{`Edit Order - "${record.item_name}"`}</span>;
};

const OrderEdit = props => {
    const { parcel_id: parcel_id_string } = parse(props.location.search);
    let redirect = 'list'
    if(parcel_id_string){
        const parcel_id = parseInt(parcel_id_string, 10)
        redirect = `/parcel/${parcel_id}/show/order`
    }
    return (
        <Edit title={<OrderTitle />} undoable={false} {...props}>
            <SimpleForm 
                submitOnEnter={false}
                redirect={redirect}
            >
                <TextField source="id"/>
                <ReferenceInput source="parcel_id" reference="parcel">
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <TextInput source="item_name"/>
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
        </Edit>
    )
}

export default OrderEdit