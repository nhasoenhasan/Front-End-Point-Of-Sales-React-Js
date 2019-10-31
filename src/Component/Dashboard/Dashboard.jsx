import React, { useEffect,useState } from 'react';
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
import { MdRestaurant } from "react-icons/md";
import { FaChartLine,FaDatabase } from "react-icons/fa";
import { Route,Link } from 'react-router-dom';
import Mproduct from '../Product/Manage/Mproduct'
import Mcategories from '../Categories/Mcategories';

const Dashboard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialFormState = { search: "",
                             sort: "",
                              order:"" };
  const [input, setInput] = useState(initialFormState);

  const toggle = () => setIsOpen(!isOpen);

  const fetchddata=async()=>{
    console.log("Input =",input)
    await props.dispatch(getProduct (input))
    .then(result => {
      // console.log("Input",input)
      // console.log("Hasil",result)
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(()=>{
    fetchddata()
  },[input])

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchddata()
  };

  const handleChange = nameName => event => {
    setInput({ ...input, [nameName]: event.target.value });
    // console.log("Inputan",event.target.value)
  };

  return (
    <div >
      <Navbar style={{backgroundColor:"#000000"}} light className="fixed-top" expand="md"  >
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
          </Form>
          </Nav>
        </Collapse>
      </Navbar>
      <div className="d-flex flex-row" >
        <ListGroup style={{width:"10%",position:"fixed",height:"100%",marginTop:"4%",backgroundColor:"#414141"}}>
          <Link to="/dashboard/product"><ListGroupItem style={{backgroundColor:"#414141",color:"#ffffff"}}><MdRestaurant/>Food</ListGroupItem>
          <ListGroupItem style={{backgroundColor:"#414141",color:"#ffffff"}}><FaChartLine/>Order</ListGroupItem></Link>
          <Link to="/dashboard/mcategories"><ListGroupItem style={{backgroundColor:"#414141",color:"#ffffff"}}><FaDatabase/>Categories</ListGroupItem></Link>
          <Link to="/dashboard/mproduct"><ListGroupItem style={{backgroundColor:"#414141",color:"#ffffff"}}><FaDatabase/>Product</ListGroupItem></Link>
        </ListGroup>
        
      </div>
      
      {/* <div className="d-flex flex-row-reverse">
        <ListGroup style={{width:"7%",position:"fixed",height:"100%",marginTop:"4%",backgroundColor:"red"}}>
          <ListGroupItem>A</ListGroupItem>
          <ListGroupItem>B</ListGroupItem>
          <ListGroupItem>B</ListGroupItem>
          <ListGroupItem>C</ListGroupItem>
          <ListGroupItem>D</ListGroupItem>
        </ListGroup>
      </div> */}
       
      <Route  path='/dashboard/product' > <Productlist handleChange={handleChange}/></Route>
      <Route  path='/dashboard/mproduct' > <Mproduct/></Route>
      <Route  path='/dashboard/mcategories' > <Mcategories/></Route>
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
