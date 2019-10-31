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
      const result = await props.dispatch(postCategories(input))
      setModaladd(!modaladd)
    } catch (err) {

    }
  };

  //Button EDIT Clicked!
  const handleSubmitedit = async (event) => {
    event.preventDefault();
    try {
      const result = await props.dispatch(patchCategories(input))
      setModaledit(!modaledit)
    } catch (err) {

    }
  };

  //Button DELETE Clicked!
  const handleSubmitdelete = async (event) => {
    event.preventDefault();
    try {
      const result = await props.dispatch(deleteCategories(input))
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
    <div className="container" style={{marginTop:"7%"}}>
    <Button color="success" onClick={showModalAdd} className="ml-5 "><FaPlus/></Button>
    {/* ----------------------------------------[MODAL ADD]----------------------------------- */}
    <Modal isOpen={modaladd} toggle={showModalAdd} className={className}>
        <ModalHeader toggle={showModalAdd}>ADD Categories</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label >Name</Label>
              <Input type="text" name="Categories"  placeholder="Insert Categories Categories"
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
      <Modal isOpen={modaledit} toggle={showModalEdit} className={className}>
          <ModalHeader toggle={showModalEdit}>EDIT Categories</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label >Name</Label>
                <Input type="text" name="Categories"  placeholder="Insert Categories Categories"
                onChange={handleChange("Categories")}
                value={input.Categories} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={handleSubmitedit}>Insert</Button>{' '}
            <Button color="secondary" onClick={showModalEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>
      {/* ----------------------------------END MODAL EDIT----------------------------------------- */}
    {/* -------------------------------------------MODAL DELETE------------------------------------ */}
    <Modal isOpen={modaldelete} toggle={showModalDelete} className={className}>
          <ModalHeader toggle={showModalDelete}>DELETE CATEGORIES</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input type="hidden" name="name"  placeholder="Insert Name Categories"
                onChange={handleChange("name")}
                value={input.id_categories} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={handleSubmitdelete}>Insert</Button>{' '}
            <Button color="secondary" onClick={showModalDelete}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* --------------------------------END MODAl DELETE------------------------ */}
    <Table  className="ml-5 mt-3">
      <thead>
        <tr className="d-flex">
          <th className="col-2 text-center">Categories</th>
        </tr>
      </thead>
      <tbody>
        {props.categories.map(item=>{
            return(
                <tr className="d-flex">
                    <td className="col-2">{item.Categories}</td>
                    <td className="col-1"><Button value={item.id_categories} onClick={()=>updateCategories(item)} color="warning" ><FaEdit/></Button><Button value={item.id_categories} onClick={()=>delCategories(item)}  className="mt-2"color="danger"><FaTrashAlt /></Button></td>
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
