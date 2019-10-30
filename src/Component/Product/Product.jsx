import React, { useState,useEffect} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Row, Col,Spinner,Form, FormGroup, Label, Input,
} from 'reactstrap';
import {connect} from 'react-redux';
import { FaSortAmountDown,FaSortAmountUp } from 'react-icons/fa';


const Productlist= (props) => {
    const initialFormState = { sort: "",
                               order:"" };
    const [input, setInput] = useState(initialFormState);

  return (
    <div className="container "  >
      <div style={{marginLeft:"6%"}}>
        <div className="form-group row " style={{marginTop:"7%"}}>
          <Input className="col-sm-2 ml-3" type="select" onChange={props.handleChange("sort")} value={input.sort}>
            <option >Sort By ...</option>
            <option value={'name'}>Name</option>
            <option value={'Categories'}>Categories</option>
            <option value={'date_added'}>Date Aded</option>
            <option value={'date_updated'}>Date Updated</option>
          </Input>
          <Button color="primary " className="ml-2 mr-2" onClick={props.handleChange("order")}  value={'ASC'}><FaSortAmountDown/></Button>
          <Button color="primary " className="" onClick={props.handleChange("order")} value={'DESC'}><FaSortAmountUp/></Button>
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
                    <Card  className="mt-3">
                        <CardImg top width="100%" src={item.image} alt="Card image cap" />
                        <CardBody>
                        <CardTitle  key={item.id} >{item.name}</CardTitle>
                        <CardText>{item.description}</CardText>
                        </CardBody>
                    </Card>
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

export default connect (mapStateToProps) (Productlist);
