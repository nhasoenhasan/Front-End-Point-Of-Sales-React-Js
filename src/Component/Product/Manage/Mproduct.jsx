import React,{useEffect,useState} from 'react';
import { Table,Button, Modal, ModalHeader, ModalBody, ModalFooter,
         Form, FormGroup, Label, Input, } from 'reactstrap';
import {connect} from 'react-redux';
import { FaEdit,FaTrashAlt,FaPlus } from "react-icons/fa";
import {getCategories} from '../../Public/Redux/Actions/categories';
import {postProduct} from '../../Public/Redux/Actions/product';

const Mproduct = (props) => {

  const initialFormState = { name: "",
                             description: "", 
                             image: "",
                             id_categories: "",
                             price:"" ,
                             quantity:""};
  
  const [input, setInput] = useState(initialFormState);

  const {
    buttonLabel,
    className
  } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.dispatch(postProduct(input))
    .then(result => {
      console.log("Data Rseult",result)
    })
    .catch(err => {
      console.log(err);
    });
  };

  const fetchddatacategories=async()=>{
    await props.dispatch(getCategories (input))
    .then(result => {
      // console.log("Input",input)
      // console.log("Hasil",result)
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(()=>{
    fetchddatacategories()
  },[])

  

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleChange = nameName => event => {
    setInput({ ...input, [nameName]: event.target.value });
  };

  
console.log(input)
  return (
    <div className="container" style={{marginTop:"7%"}}>
    <Button color="success" onClick={toggle} className="ml-5 "><FaPlus/></Button>
    {/* ----------------------------------------[MODAL ADD]----------------------------------- */}
    <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>ADD PRODUCT</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label >Name</Label>
              <Input type="text" name="name"  placeholder="Insert Name Product"
              onChange={handleChange("name")}
              value={input.name} />
            </FormGroup>
            <FormGroup>
              <Label >Description</Label>
              <Input type="text" name="description" placeholder="Insert Description Product"
              onChange={handleChange("description")}
              value={input.description} />
            </FormGroup>
            <FormGroup>
              <Label >Url Image</Label>
              <Input type="text" name="image" placeholder="Insert Url Image Product" 
              onChange={handleChange("image")}
              value={input.image}/>
            </FormGroup>
            <FormGroup>
              {/* ----------------------------------------------- */}
              <div className="form-group">
                <label >Categories</label>
                <select className="form-control" onChange={handleChange("id_categories")} value={input.id_categories} id="exampleFormControlSelect1">
                  {props.categories.map(item=>{
                    return(
                      <option value={item.id_categories}>{item.Categories}</option>
                    )
                  })}
                </select>
              </div>
              {/* ----------------------------------------------- */}
            </FormGroup>
            <FormGroup>
              <Label >Price</Label>
              <Input type="text" name="price" placeholder="Insert Price Product"
              onChange={handleChange("price")}
              value={input.price} />
            </FormGroup>
            <FormGroup>
              <Label >Quantity</Label>
              <Input
                type="number"
                name="number"
                placeholder="Insert Quantity Product"
                onChange={handleChange("quantity")}
                value={input.quantity}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleSubmit}>Insert</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      {/* --------------------------------------------------------------------------- */}
    <Table  className="ml-5 mt-3">
      <thead>
        <tr className="d-flex">
          <th className="col-2 text-center">Name</th>
          <th className="col-3 text-center">Description</th>
          <th className="col-2 text-center">Image</th>
          <th className="col-2 ">Price</th>
          <th className="col-2">Qty</th>
          <th className="col-1">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map(item=>{
            return(
                <tr className="d-flex">
                    <td className="col-2">{item.name}</td>
                    <td className="text-break col-3">{item.description}</td>
                    <td className="col-2 text-center"><img style={{width:"70px"}} src={item.image} /></td>
                    <td className="col-2">{item.price}</td>
                    <td className="col-2">{item.quantity}</td>
                    <td className="col-1"><Button color="warning" ><FaEdit/></Button><Button className="mt-2"color="danger"><FaTrashAlt /></Button></td>
                </tr>
            )
        })}
      </tbody>
    </Table>
    </div>
  );
}

const mapStateToProps = state => {
    return {
      products: state.product.productList,
      categories:state.categories.categoriesList
    };
};

export default connect (mapStateToProps) (Mproduct);
