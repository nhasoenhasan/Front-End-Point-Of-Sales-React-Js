import React, { useState,useEffect} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Row, Col,Spinner,Form, FormGroup, Label, Input
} from 'reactstrap';
import {connect} from 'react-redux';
import { FaPlus,FaSortAmountDown,FaSortAmountUp } from 'react-icons/fa';
import { addToCart } from '../Public/Redux/Actions/cartActions'

const Productlist= (props) => {
    const initialFormState = { sort: "",
                               order:"" };
    const [input, setInput] = useState(initialFormState);

    const handleClick = (id)=>{
        props.addToCart(id); 
    }
  return (
    <div className="container ">
      <div style={{marginLeft:"6%"}}>
        <div className="form-group row " style={{marginTop:"9%"}}>
          {/* <Input className="col-sm-2 ml-3" type="select" onChange={props.handleChange("sort")} value={input.sort}>
            <option >Sort By ...</option>
            <option value={'name'}>Name</option>
            <option value={'Categories'}>Categories</option>
            <option value={'date_added'}>Date Aded</option>
            <option value={'date_updated'}>Date Updated</option>
          </Input> */}
          {/* -------------- */}
          <select className="form-control col-sm-2 ml-3" onChange={props.handleChange("sort")} value={input.sort} id="exampleFormControlSelect1">
            <option >Sort By ...</option>
            <option value={'name'}>Name</option>
            <option value={'Categories'}>Categories</option>
            <option value={'date_added'}>Date Aded</option>
            <option value={'date_updated'}>Date Updated</option>
          </select>
          <select className="form-control col-sm-2 ml-3" onChange={props.handleChange("order")} value={input.order} id="exampleFormControlSelect1">
            <option >Order By ...</option>
            <option value={'ASC'}>ASC</option>
            <option value={'DESC'}>DESC</option>
          </select>
          {/* <Button color="primary " className="ml-2 mr-2" onClick={props.handleChange("order")}  value={'ASC'}><FaSortAmountDown/></Button>
          <Button color="primary " className="" onClick={props.handleChange("order")} value={'DESC'}><FaSortAmountUp/></Button> */}
        </div>
        <Row >
              { props.products.length==''?
              //When Data Loading
              <div >
                <Spinner style={{ width: '4rem', height: '4rem',marginTop:'10rem',marginLeft:'34rem' }} />
              </div>
              :
              //When Data Availabel
              props.products.map(item=>{
                return(
                <Col md="3" className="mb-5" >
                    <div className="card" style={{maxHeight: "60%",minHeight: "60%"}}>
                      <img className="card-img-top" style={{maxHeight: "15rem",minHeight: "15rem"}} src={item.image} alt="Card image cap"/>
                      <div className="card-body text-white" style={{border:" 1px solid black",backgroundColor:"black"}}>
                        <p className="card-text font-weight-bold">{item.name}</p>
                        <p className="card-text font-weight-bold">Rp.{item.price}</p>
                        <p className="card-text text-truncate" >{item.description}</p> 
                        <Button color="warning"  className="" onClick={()=>{handleClick(item.id_product)}}><FaPlus/></Button>
                      </div>
                    </div>
              </Col>
                )
              })
              }
        </Row>
        </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    products: state.product.productList
  };
};

const mapDispatchToProps= (dispatch)=>{
    
  return{
      addToCart: (id)=>{dispatch(addToCart(id))}
  }
}

export default connect (mapStateToProps,mapDispatchToProps) (Productlist);
