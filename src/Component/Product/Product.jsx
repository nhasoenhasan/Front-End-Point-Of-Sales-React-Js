import React, { useEffect} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Row, Col,Spinner 
} from 'reactstrap';
import {getProduct} from '../Public/Redux/Actions/product';
import {connect} from 'react-redux';


const Productlist= (props) => {
    useEffect(() => {
      props.dispatch(getProduct ());
    }, []);

  console.log(props.products)
  return (
    <div className="container">
        <Row>
              { props.products==''?
              //When Data Loading
              <Spinner color="dark" />
              :
              //When Data Availabel
              props.products.map(item=>{
                return(
                <Col md="3" style={{marginTop:"7%"}} >
                    <Card >
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
  );
};

const mapStateToProps = state => {
  return {
    products: state.product.productList
  };
};

export default connect (mapStateToProps) (Productlist);
