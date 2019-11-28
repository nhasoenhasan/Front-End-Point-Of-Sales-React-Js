import React, { useState,useEffect} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import EmptyCart from '../../Assets/Images/shopping_cart.png'

import { useSelector,useDispatch } from 'react-redux';
import { removeItem,addQuantity,subtractQuantity} from '../Public/Redux/Actions/cartActions';
import {postOrder} from '../Public/Redux/Actions/product';

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
    cart:{
      padding:'10%',
      marginTop:'23%'
    },
    imagecart: {
      maxWidth:300,
      maxHeight:300
    },
    card: {
      display: 'flex',
      margin:15
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    cover: {
      minWidth:151,
      maxWidth:151
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    toolbar: theme.mixins.toolbar,
  }));

  const Cart=(props)=>{
    const classes = useStyles();
    const dispatch=useDispatch();

    const [input, setInput]=useState({
      id_product:"",
      total:"",
      qty:"",
    });
    const [Total, setTotal]=useState();
    const [isLoading,setisLoading]=useState(false);
    const [open, setOpen] = useState(false);

    const items=useSelector(state=>state.product.addedItems)
    const Totals=useSelector(state=>state.product.total)
    
    useEffect(()=>{
      setInput({ ...items})
    },[items])
    
    useEffect(()=>{
        setTotal(Totals)
    },[Totals])
    
    //to add the quantity
    const handleAddQuantity =(id)=>{
        // setInput({ ...props.items})
        dispatch(addQuantity(id));
    }
    //to substruct from the quantity
    const handleSubtractQuantity = (id,quantity)=>{
        if(quantity===1){
          dispatch(removeItem(id));
        }else{
          dispatch(subtractQuantity(id));
        }
    }
    //to substruct from the quantity
    const handlecheckout = async(event)=>{
        setisLoading(true)
        event.preventDefault();
        try {
             const result =await dispatch(postOrder(input,Total))
             if(result.action.payload.data.status===200){
              setOpen(true);
              setisLoading(false)
             }
             setisLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    
    return(
        <Drawer
          className={classes.drawerRight}
          variant="permanent"
          classes={{
            paper: classes.drawerPaperRight,
          }}
          anchor="right"
        >
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={open}
            // autoHideDuration={6000}
            onClose={handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
          message={<span id="message-id">Succes Make Order</span>}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="secondary"
                className={classes.close}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
          <div className={classes.toolbar} />
          <List className="text-center" style={{paddingBottom:100}}>
          {(items.length===0)?
            <div className={classes.cart}>
              <img className={classes.imagecart} alt="cart" src={EmptyCart} />
              <h3 className="font-weight-bold">No Item Adedd</h3> 
            </div>
            :
            items.map(item=>{
            return(
            <div key={item.id_product}>
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Rp{item.price}
                  </Typography>
                </CardContent>
                <div className={classes.controls}>
                  <IconButton aria-label="previous" onClick={()=>{handleAddQuantity(item.id_product)}}>
                     <AddCircleOutlineRoundedIcon style={{color:'#00ab2e'}}/> 
                  </IconButton>
                  <div className="m-2">
                  <Typography fontWeight={500} m={1}>
                  {item.quantity}
                  </Typography>
                  </div>
                  <IconButton aria-label="previous" onClick={()=>{handleSubtractQuantity(item.id_product,item.quantity)}}>
                     <RemoveCircleOutlineRoundedIcon color='secondary'/> 
                  </IconButton>
                </div>
              </div>
              <CardMedia
                className={classes.cover}
                image={item.image}
                title="Live from space album cover"
              />
            </Card>
            </div>
            )
            })
            }
          </List>

          {(items.length!==0)?
          <div style={{position:'fixed',bottom:0.4,alignItems:'center',width:'100%',backgroundColor:'white',paddingBottom:4}} >

             <h6 className="font-weight-bold">Sub Total : Rp.{Totals}</h6> 
            <Button variant="contained" color="secondary"  onClick={handlecheckout} disabled={isLoading}>
                Checkout
                {isLoading && <CircularProgress color="secondary" size={24} />}
            </Button>
          </div>:
           <div></div> }
        </Drawer>
    )
}

export default Cart;