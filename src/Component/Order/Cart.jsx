import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity,addToCart} from '../Public/Redux/Actions/cartActions'
import {postOrder} from '../Public/Redux/Actions/product' 
import {Button,Row,Col} from 'reactstrap';
import { FaPlus,FaSortAmountDown,FaSortAmountUp } from 'react-icons/fa';

const Cart= (props) => {
    const [input, setInput]=useState({
        id_product:"",
        total:"",
        qty:"",
    });
    
    const [Total, setTotal]=useState({
        sub_total:""
    });

    useEffect(()=>{
        setInput({ ...props.items})
    },[props.items])
    
    useEffect(()=>{
        setTotal({ sub_total:props.Total})
    },[props.Total])
    
    const handleRemove = (id)=>{
        props.removeItem(id);
    }
    //to add the quantity
    const handleAddQuantity =(id)=>{
        // setInput({ ...props.items})
        props.addQuantity(id);
    }
    //to substruct from the quantity
    const handleSubtractQuantity = (id)=>{
        props.subtractQuantity(id);
    }
    //to substruct from the quantity
    const handlecheckout = async(event)=>{
        event.preventDefault();
        try {
            await props.dispatch(postOrder(input))
        } catch (error) {
            
        }
    }
    
    let addedItems = props.items.length ?
    (  
                
                props.items.map(item=>{
                    return(
                        <Col md="3" className="mb-5" >
                        <div className="card" style={{maxHeight: "60%",minHeight: "60%"}}>
                        <img className="card-img-top" style={{maxHeight: "15rem",minHeight: "15rem"}} src={item.image} alt={item.img} alt="Card image cap"/>
                        <div className="card-body text-white" style={{border:" 1px solid black",backgroundColor:"black"}}>
                            <p className="card-text font-weight-bold">{item.name}</p>
                            <p className="card-text font-weight-bold"> Price : Rp.{item.price}</p>
                            <p className="card-text font-weight-bold"> Quantity:{item.quantity}</p>
                            <Button color="warning"  className="" onClick={()=>{handleAddQuantity(item.id_product)}}><FaPlus/></Button>
                            <Button color="warning"  className="ml-2" onClick={()=>{handleSubtractQuantity(item.id_product)}}>-</Button><br/>
                            <Button color="danger"  className=" mt-2" onClick={()=>{handleRemove(item.id_product)}}>Remove</Button>
                            
                        </div>
                        </div>
                        </Col>
                    )
                }

                )
            ):

             (
                <h3 className="font-weight-bold">Nothing Order Here!!.</h3>
             )

       return(
            <div className="container" style={{marginLeft:"20%",marginTop:"6%"}}>
                <div >
                    <h5>You have ordered:</h5>
                        <Row>
                        {addedItems}
                        </Row>
                        <p className="font-weight-bold">Total:{props.Total} </p>
                        <Button type="submit "color="danger" onClick={handlecheckout}>Checkout</Button>
                </div>        
            </div>
       )
}

const mapStateToProps = (state)=>{
    return{
        items: state.product.addedItems,
        Total: state.product.total,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
        postOrder:(input)=>{dispatch(postOrder(input))}
    }
}

export default connect (mapStateToProps,mapDispatchToProps) (Cart);
