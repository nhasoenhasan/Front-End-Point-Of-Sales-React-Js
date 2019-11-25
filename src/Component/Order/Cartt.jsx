import React, { useState,useEffect} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import EmptyCart from '../../Assets/Images/market.png'

const useStyles = makeStyles(theme => ({
    drawerRight: {
      width: 370,
      flexShrink: 0,
    },
    drawerPaperRight: {
      width: 370,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    imagecart: {
      maxWidth:350,
      maxHeight:400
    },
    toolbar: theme.mixins.toolbar,
  }));

const Cart=(props)=>{
    const classes = useStyles();
    return(
        <Drawer
          className={classes.drawerRight}
          variant="permanent"
          classes={{
            paper: classes.drawerPaperRight,
          }}
          anchor="right"
        >
          <div className={classes.toolbar} />
          <List className="text-center">
            <img className={classes.imagecart} src={EmptyCart} />
            <h3 className="font-weight-bold">No Item Adedd</h3>
          </List>
        </Drawer>
    )
}

export default Cart;