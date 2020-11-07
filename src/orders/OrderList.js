import React from 'react';
import { 
    List,
    Datagrid,
    TextField,
    EditButton,
    DateField,
    ReferenceField,
    NumberField
} from 'react-admin';

const OrderList = (props) => {
    return (
        <List id='order-list' bulkActionButtons={ false } {...props}>
            <Datagrid id='order-table'>
                <TextField source="id"/>
                <TextField source="item_name"/>
                <ReferenceField source="parcel_id" reference="parcel">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="store_id" reference="store">
                    <TextField source="name" />
                </ReferenceField>
                <NumberField source="cost" />
                <NumberField source="weight" />
                <DateField source="order_date" />
                <ReferenceField source="courier_id" reference="courier">
                    <TextField source="name" />
                </ReferenceField>
                <TextField label="Tracking id" source="tracking_id"/>
                <DateField source="shipping_date" />
                <DateField source="delivery_date" />
                <EditButton id='order-list-edit' />
            </Datagrid>
        </List>
    );
}

export default OrderList