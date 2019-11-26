import React,{useEffect,useState} from 'react';
import { Table,Button, Modal, ModalHeader, ModalBody, ModalFooter,
         Form, FormGroup, Label, Input, } from 'reactstrap';
import {connect} from 'react-redux';
import { FaEdit,FaTrashAlt,FaPlus } from "react-icons/fa";
import {getCategories,postCategories,patchCategories,deleteCategories} from '../Public/Redux/Actions/categories';


const Mcategories = (props) => {
  
  const initialFormState = { id_categories:"",Categories:""};
  
  const [input, setInput] = useState(initialFormState);
  
  const {
    className
  } = props;
  
 
  const [modaledit, setModaledit] = useState(false);
  const [modaladd, setModaladd] = useState(false);
  const [modaldelete, setModaldelete] = useState(false);

  //Button Input Clicked!
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await props.dispatch(postCategories(input))
      setModaladd(!modaladd)
    } catch (err) {

    }
  };

  //Button EDIT Clicked!
  const handleSubmitedit = async (event) => {
    event.preventDefault();
    try {
      await props.dispatch(patchCategories(input))
      setModaledit(!modaledit)
    } catch (err) {

    }
  };

  //Button DELETE Clicked!
  const handleSubmitdelete = async (event) => {
    event.preventDefault();
    try {
      await props.dispatch(deleteCategories(input))
      setModaldelete(!modaldelete)
    } catch (err) {

    }
  };

  //Fetch data
  const fetchddatacategories=async()=>{
    try {
      await props.dispatch(getCategories(input))
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
  const updateCategories =(row)=>{
    setInput(row)
    setModaledit(!modaledit);
  }

  //Get data Delete
  const delCategories =(row)=>{
    setInput(row)
    setModaldelete(!modaldelete);
  }

  
  const handleChange = nameName => event => {
    setInput({ ...input, [nameName]: event.target.value });
  };

  return (
    <div className="container" >
    <Button color="success" onClick={showModalAdd} className="ml-5 "><FaPlus/></Button>
    {/* ----------------------------------------[MODAL ADD]----------------------------------- */}
    <Modal isOpen={modaladd} toggle={showModalAdd} className={className} style={{marginTop:"7%"}}>
        <ModalHeader toggle={showModalAdd}>ADD Categories</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label >Name</Label>
              <Input type="text" name="Categories"  placeholder="Insert Name Categories "
              onChange={handleChange("Categories")}
              value={input.Categories} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleSubmit}>Insert</Button>{' '}
          <Button color="secondary" onClick={showModalAdd}>Cancel</Button>
        </ModalFooter>
      </Modal>
      {/* ----------------------------------END MODAL ADD----------------------------------------- */}

      {/* ----------------------------------------[MODAL EDIT]----------------------------------- */}
      <Modal isOpen={modaledit} toggle={showModalEdit} className={className} style={{marginTop:"7%"}}>
          <ModalHeader toggle={showModalEdit}>EDIT Categories</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label >Name</Label>
                <Input type="text" name="Categories"  placeholder="Insert Name Categories"
                onChange={handleChange("Categories")}
                value={input.Categories} />
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
    <Modal className="modal-dialog modal-sm " isOpen={modaldelete} toggle={showModalDelete} style={{marginTop:"7%"}}>
          <ModalHeader  toggle={showModalDelete}>DELETE CATEGORIES</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup className="text-center">
                <img alt="categories image" width="40%" src="https://cdn2.iconfinder.com/data/icons/weby-flat-vol-1/512/1_warning-caution-exclamation-alert-attention-error-02-512.png"></img>
                <p className="font-weight-bold">are you sure to delete this item? </p>
                <Input type="hidden" name="name"  placeholder="Insert Name Categories"
                onChange={handleChange("name")}
                value={input.id_categories} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={handleSubmitdelete}>OK</Button>{' '}
            <Button color="secondary" onClick={showModalDelete}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* --------------------------------END MODAl DELETE------------------------ */}
      <Table  className="ml-5 mt-3" >
        <thead>
          <tr className="d-flex">
            <th className="col-4 text-center">Categories</th>
            <th className="col-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.categories.map(item=>{
              return(
                  <tr className="d-flex">
                      <td className="col-4">{item.Categories}</td>
                      <td className="col-3 text-center"><Button value={item.id_categories} onClick={()=>updateCategories(item)} color="warning" ><FaEdit/></Button><Button value={item.id_categories} onClick={()=>delCategories(item)}  className="ml-3"color="danger"><FaTrashAlt /></Button></td>
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
      categories: state.categories.categoriesList,
    };
};

export default connect (mapStateToProps) (Mcategories);
