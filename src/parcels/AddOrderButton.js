import React from 'react'
import { Link } from 'react-router-dom'
import AddBox from '@material-ui/icons/AddBox'
import { withStyles } from '@material-ui/core/styles'
import { Button } from 'react-admin'

const styles = {
  button: {
    marginTop: '1em'
  }
};

const AddOrderButton = ({ classes, record }) => (
    <Button
        className={classes.button}
        variant='raised'
        component={Link}
        to={`/order/create?parcel_id=${record.id}`}
        label='Add an order'
        title='Add an order'
    >
        <AddBox />
    </Button>
);

export default withStyles(styles)(AddOrderButton);