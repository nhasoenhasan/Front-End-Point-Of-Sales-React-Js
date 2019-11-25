import React,{useEffect,useState} from 'react';
import { Table,Button, Modal, ModalHeader, ModalBody, ModalFooter,
         Form, FormGroup, Label, Input, } from 'reactstrap';
import {connect} from 'react-redux';
import { FaEdit,FaTrashAlt,FaPlus } from "react-icons/fa";
import {getCategories} from '../../Public/Redux/Actions/categories';
import {postProduct,patchProduct,deleteProduct} from '../../Public/Redux/Actions/product';
import { IoIosWarning } from "react-icons/io";


const Mproduct = (props) => {
  
  const initialFormState = { id_product:"",name: "", description: "",image: "",id_categories: "",price:"" ,quantity:""};
  
  const [input, setInput] = useState(initialFormState);
  
  const {
    buttonLabel,
    className
  } = props;
  
  const [modaledit, setModaledit] = useState(false);
  const [modaladd, setModaladd] = useState(false);
  const [modaldelete, setModaldelete] = useState(false);

  //Button Input Clicked!
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await props.dispatch(postProduct(input))
      setModaladd(!modaladd)
    } catch (err) {

    }
  };

  //Button EDIT Clicked!
  const handleSubmitedit = async (event) => {
    event.preventDefault();
    try {
      const result = await props.dispatch(patchProduct(input))
      setModaledit(!modaledit)
    } catch (err) {

    }
  };

  //Button DELETE Clicked!
  const handleSubmitdelete = async (event) => {
    event.preventDefault();
    try {
      const result = await props.dispatch(deleteProduct(input))
      setModaldelete(!modaldelete)
    } catch (err) {

    }
  };

  //Fetch data
  const fetchddatacategories=async()=>{
    try {
      const result = await props.dispatch(getCategories(input))
    } catch (err) {

    }
  }

  //
  useEffect(()=>{
    fetchddatacategories()
  },[])


  //Show Modal Add
  const showModalAdd = () => {
    setInput(initialFormState)
    setModaladd(!modaladd);
  }

  //Show Modal Edit
  const showModalEdit = () => {
    setInput(initialFormState)
    setModaledit(!modaledit);
  }

  //Show Modal Delete
  const showModalDelete = () => {
    setInput(initialFormState)
    setModaldelete(!modaldelete);
  }

  //Get Data Edit
  const updateProduct =(row)=>{
    setInput(row)
    setModaledit(!modaledit);
  }

  //Get data Delete
  const delProduct =(row)=>{
    setInput(row)
    setModaldelete(!modaldelete);
  }

  
  const handleChange = nameName => event => {
    setInput({ ...input, [nameName]: event.target.value });
  };

  console.log(input)
  return (
    <div className="container">
    <Button color="success" onClick={showModalAdd} ><FaPlus/></Button>
    {/* ----------------------------------------[MODAL ADD]----------------------------------- */}
    <Modal isOpen={modaladd} toggle={showModalAdd} className={className}  style={{marginTop:"7%"}}>
        <ModalHeader   toggle={showModalAdd}>ADD PRODUCT</ModalHeader>
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
        <ModalFooter >
          <Button color="warning" onClick={handleSubmit}>Insert</Button>{' '}
          <Button color="secondary" onClick={showModalAdd}>Cancel</Button>
        </ModalFooter>
      </Modal>
      {/* ----------------------------------END MODAL ADD----------------------------------------- */}

      {/* ----------------------------------------[MODAL EDIT]----------------------------------- */}
      <Modal isOpen={modaledit} toggle={showModalEdit} className={className} style={{marginTop:"7%"}}>
          <ModalHeader toggle={showModalEdit}>EDIT PRODUCT</ModalHeader>
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
            <Button color="warning" onClick={handleSubmitedit}>Update</Button>{' '}
            <Button color="secondary" onClick={showModalEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>
      {/* ----------------------------------END MODAL EDIT----------------------------------------- */}
    {/* -------------------------------------------MODAL DELETE------------------------------------ */}
    <Modal isOpen={modaldelete} toggle={showModalDelete}  className="modal-dialog modal-sm" style={{marginTop:"7%"}}>
          <ModalBody  >
            <Form>
              <FormGroup className="text-center">
                <img  width="40%" src="https://cdn2.iconfinder.com/data/icons/weby-flat-vol-1/512/1_warning-caution-exclamation-alert-attention-error-02-512.png"></img>
                <p className="font-weight-bold">are you sure to delete this item? </p>
                <Input type="hidden" name="name"  placeholder="Insert Name Product"
                onChange={handleChange("name")}
                value={input.id_product} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter >
            <Button color="warning" onClick={handleSubmitdelete}>Okey</Button>{' '}
            <Button color="secondary" onClick={showModalDelete}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* --------------------------------END MODAl DELETE------------------------ */}
    <Table  className="pl-4 mt-3">
      <thead>
        <tr className="d-flex">
          <th className="col-2 text-center">Name</th>
          <th className="col-2 text-center">Description</th>
          <th className="col-2 text-center">Categories</th>
          <th className="col-2 text-center">Image</th>
          <th className="col-2 ">Price</th>
          <th className="col-1">Qty</th>
          <th className="col-1">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map(item=>{
            return(
                <tr className="d-flex">
                    <td className="col-2">{item.name}</td>
                    <td className="text-break col-2">{item.description}</td>
                    <td className="col-1" style={{display:"none"}}>{item.id_categories}</td>
                    <td className="col-2 text-center" type="hidden">{item.Categories}</td>
                    <td className="col-2 text-center"><img style={{width:"70px"}} src={item.image} /></td>
                    <td className="col-2">{item.price}</td>
                    <td className="col-1">{item.quantity}</td>
                    <td className="col-1"><Button value={item.id_product} onClick={()=>updateProduct(item)} color="warning" ><FaEdit/></Button><Button value={item.id_product} onClick={()=>delProduct(item)}  className="mt-2"color="danger"><FaTrashAlt /></Button></td>
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
