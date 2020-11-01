import React from 'react'
import { 
    List,
    Datagrid,
    TextField,
    BooleanField,
    EditButton
} from 'react-admin'
import CourierFilter from './CourierFilter'

const CourierList = (props) => {
    const defaultFilters = { 
        active: true
    }
    return (
        <List id='courier-list' filters={<CourierFilter />} filterDefaultValues={defaultFilters} bulkActionButtons={ false } {...props}>
            <Datagrid id='courier-table'>
                <TextField source="id" id='courier-list-id' />
                <TextField source="name" id='courier-list-name' />
                <BooleanField source="active" id='courier-list-active' />
                <EditButton id='courier-list-edit' />
            </Datagrid>
        </List>
    )
}

export default CourierList