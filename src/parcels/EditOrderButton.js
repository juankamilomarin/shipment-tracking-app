import React from 'react'
import { Link } from 'react-router-dom'
import Create from '@material-ui/icons/Create'
import { Button } from 'react-admin'

const stopPropagation = e => e.stopPropagation()

const EditOrderButton = ({ record }) => {
    return (
    <Button
        component={Link}
        to={`/order/${record.id}?parcel_id=${record.parcel_id}`}
        label='ra.action.edit'
        onClick={stopPropagation}
    >
        <Create />
    </Button>
)};

export default EditOrderButton;