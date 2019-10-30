import React, { useState } from 'react';
import {
  Collapse,Navbar,
  NavbarToggler, NavbarBrand,
  Nav, NavItem,
  NavLink, UncontrolledDropdown,
  DropdownToggle, DropdownMenu,
  DropdownItem, ListGroup, 
  ListGroupItem,Form,
  Button,Input,Card,CardBody } from 'reactstrap';
import Productlist from '../Product/Product';
import {getProduct} from '../Public/Redux/Actions/product';
import {connect} from 'react-redux';
import { FaSearch } from 'react-icons/fa';

const Dashboard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialFormState = { search: "" };
  const [input, setInput] = useState(initialFormState);

  const toggle = () => setIsOpen(!isOpen);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.dispatch(getProduct (input))
    .then(result => {
      console.log("Input",input)
      console.log("Hasil",result)
    })
    .catch(err => {
      console.log(err);
    });
  };

  const handleChange = nameName => event => {
    setInput({ ...input, [nameName]: event.target.value });
    
  };

  // console.log(handleChange());
  return (
    <div >
      <Navbar color="dark" light className="fixed-top" expand="md"  >
        <NavbarBrand className="text-white" href="/">Lawless </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto " navbar>
            <NavItem>
              <NavLink  className="text-white" href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  className="text-white" href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle  className="text-white" nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu  className="text-white" right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem >
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem  >
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Form className="form-inline my-2 my-lg-0">
            <Input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            onChange={handleChange("search")}
            value={input.search}></Input>
            <Button className="btn btn-warning " type="button"
            onClick={handleSubmit}><FaSearch/></Button>
          </Form>
          </Nav>
        </Collapse>
      </Navbar>
      <div className="d-flex flex-row">
        <ListGroup style={{width:"7%",position:"fixed",height:"100%",marginTop:"4%",backgroundColor:"red"}}>
          <ListGroupItem>A</ListGroupItem>
          <ListGroupItem>B</ListGroupItem>
          <ListGroupItem>B</ListGroupItem>
          <ListGroupItem>C</ListGroupItem>
          <ListGroupItem>D</ListGroupItem>
        </ListGroup>
        
      </div>
      
      <div className="d-flex flex-row-reverse">
        <ListGroup style={{width:"7%",position:"fixed",height:"100%",marginTop:"4%",backgroundColor:"red"}}>
          <ListGroupItem>A</ListGroupItem>
          <ListGroupItem>B</ListGroupItem>
          <ListGroupItem>B</ListGroupItem>
          <ListGroupItem>C</ListGroupItem>
          <ListGroupItem>D</ListGroupItem>
        </ListGroup>
      </div>
      
      <Productlist /> 
        
        
      
      <div>

      </div>
  </div>
  );
}
const mapStateToProps = state => {
  return {
    products: state.product.productList
  };
};

export default connect(mapStateToProps)(Dashboard);
