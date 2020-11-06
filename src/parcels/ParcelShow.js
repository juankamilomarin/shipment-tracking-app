import React from 'react';
import {
    Datagrid,
    DateField,
    ReferenceManyField,
    Show,
    Tab,
    TabbedShowLayout,
    TextField,
    ReferenceField,
    NumberField,
} from 'react-admin';
import AddOrderButton from './AddOrderButton';
import EditOrderButton from './EditOrderButton';

const ParcelTitle = ({ record }) => {
    return <span>{`Parcel - "${record.name}"`}</span>;
};

const ParcelShow = props => (
    <Show title={<ParcelTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="Summary" id='parce-show-summary-tab'>
                <TextField source="id" id='id'/>
                <TextField source="name" id="name" />
                <DateField source="opening_date" id="opening_date" />
                <DateField source="closing_date" id="closing_date" />
            </Tab>
            <Tab label="Orders" path="order" id='parce-show-order-tab'>
                <ReferenceManyField
                    addLabel={false}
                    reference="order"
                    target="parcel_id"
                    sort={{ field: 'order_date', order: 'ASC' }}
                >
                    <Datagrid>
                        <TextField source="item_name" id="item_name" />
                        <ReferenceField source="store_id" reference="store" id="store_name">
                            <TextField source="name" />
                        </ReferenceField>
                        <NumberField source="cost" id="cost" />
                        <NumberField source="weight" id="weight" />
                        <DateField source="order_date" id="order_date" />
                        <ReferenceField source="courier_id" reference="courier"  filter={{ active: true }} id="courier_name" >
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField label="Tracking id" source="tracking_id" id="tracking_id" />
                        <DateField source="shipping_date" id="shipping_date" />
                        <DateField source="delivery_date" id="delivery_date" />
                        <EditOrderButton/>
                    </Datagrid>
                </ReferenceManyField>
                <AddOrderButton />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default ParcelShow;
