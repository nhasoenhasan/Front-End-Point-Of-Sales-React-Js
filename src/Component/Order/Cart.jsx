import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from '../Public/Redux/Actions/cartActions'
import {Button,Row,Col} from 'reactstrap';
import { FaPlus,FaSortAmountDown,FaSortAmountUp } from 'react-icons/fa';

const Cart= (props) => {
    const handleRemove = (id)=>{
        props.removeItem(id);
    }
    //to add the quantity
    const handleAddQuantity = (id)=>{
        props.addQuantity(id);
    }
    //to substruct from the quantity
    const handleSubtractQuantity = (id)=>{
        props.subtractQuantity(id);
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

                        // <li className="collection-item avatar" key={item.id_product}>
                        //     <div className="item-img"> 
                        //         <img width="30%" src={item.image} alt={item.img} className=""/>
                        //     </div>
                        //      <div className="item-desc">
                        //         <span className="title">{item.title}</span>
                        //         <p>{item.desc}</p>
                        //         <p><b>Price: {item.price}Rp</b></p> 
                        //         <p>
                        //         <b>Quantity: {item.quantity}</b> 
                        //         </p>
                        //         <div className="add-remove">
                        //             <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id_product)}}>arrow_drop_up</i></Link>
                        //             <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id_product)}}>arrow_drop_down</i></Link>
                        //         </div>
                        //             <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id_product)}}>Remove</button>
                        //         </div>         
                        // </li> 
                    )
                }

                )
            ):

             (
                <h3 className="fonr-weight-bold">Nothing Order Here!!.</h3>
             )

       return(
            <div className="container" style={{marginLeft:"20%",marginTop:"6%"}}>
                <div >
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                        <Row>
                        {addedItems}
                        </Row>
                    </ul>
                </div>        
            </div>
       )
}

const mapStateToProps = (state)=>{
    return{
        items: state.product.addedItems,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}

export default connect (mapStateToProps,mapDispatchToProps) (Cart);
