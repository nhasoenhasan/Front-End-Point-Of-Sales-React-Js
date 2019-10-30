import React, { useEffect} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Row, Col,Spinner,Form, FormGroup, Label, Input,
} from 'reactstrap';
import {getProduct} from '../Public/Redux/Actions/product';
import {connect} from 'react-redux';
import { FaSortAmountDown,FaSortAmountUp } from 'react-icons/fa';


const Productlist= (props) => {
    const initialFormState = { search: "" };
    const [input, setInput] = useState(initialFormState);

    useEffect(() => {
      props.dispatch(getProduct ());
    }, []);

    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   await props.dispatch(getProduct (input))
    //   .then(result => {
    //     console.log("Input",input)
    //     console.log("Hasil",result)
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // };

    // const handleChange = nameName => asyncevent => {
    //   setInput({ ...input, [nameName]: event.target.value });
      
    // };

  return (
    <div className="container"  >
    
        <div class="form-group row " style={{marginTop:"7%"}}>
          <Input className="col-sm-2 ml-3" type="select">
            <option>Sort By ...</option>
            <option>Name</option>
            <option>Categories</option>
            <option>Date Aded</option>
            <option>Date Updated</option>
          </Input>
          <Button color="primary " className="ml-2 mr-2"><FaSortAmountDown/></Button><Button color="primary " className=""><FaSortAmountUp/></Button>
        </div>
        <Row >
              { props.products.length==''?
              //When Data Loading
              <Spinner color="dark" />
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
  );
};

const mapStateToProps = state => {
  return {
    products: state.product.productList
  };
};

export default connect (mapStateToProps) (Productlist);
