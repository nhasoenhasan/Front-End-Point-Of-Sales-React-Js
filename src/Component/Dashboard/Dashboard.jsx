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
import { FaChartLine,FaDatabase,FaShoppingBag } from "react-icons/fa";
import { withRouter,Route,Link } from 'react-router-dom';
import Mproduct from '../Product/Manage/Mproduct'
import Mcategories from '../Categories/Mcategories';
import Cart from '../Order/Cart';
import Logo from "../img/Lawless_burgerbar_header.gif";



const Dashboard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialFormState = { search: "",
                             sort: "",
                              order:"" };
  const [input, setInput] = useState(initialFormState);

  const toggle = () => setIsOpen(!isOpen);

  const fetchddata=async()=>{
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
        <NavbarBrand className="text-white" href="/"><img width="15%" src="http://lawlessjakarta.com/wp-content/uploads/2017/09/Lawless_burgerbar_header.gif"/></NavbarBrand><img style={{marginRight:"27%"}} width="15%" src={Logo}/>
        
        <NavbarToggler style={{backgroundColor:"white"}} onClick={toggle} />
        
        <Collapse  isOpen={isOpen} navbar>
          <Nav className="ml-auto " navbar>
            <Form className="form-inline my-2 my-lg-0">
            <Input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            onChange={handleChange("search")}
            value={input.search}></Input>
          </Form>
          </Nav>
        </Collapse>
        <Link to="/dashboard/cart" className="text-white mr-3 ml-3"><FaShoppingBag/></Link>
      </Navbar>
      <div className="d-flex flex-row" >
        <ListGroup className="font-weight-bold text-white" style={{width:"11%",position:"fixed",height:"100%",marginTop:"5%",backgroundColor:"#f5ad3f"}}>
          <Link  to="/dashboard/product"><ListGroupItem style={{backgroundColor:"#f5ad3f",color:"black"}}><MdRestaurant/>Food</ListGroupItem>
          <ListGroupItem style={{backgroundColor:"#f5ad3f",color:"black"}}><FaChartLine/>Order</ListGroupItem></Link>
          <Link to="/dashboard/mcategories"><ListGroupItem style={{backgroundColor:"#f5ad3f",color:"black"}}><FaDatabase/>Categories</ListGroupItem></Link>
          <Link to="/dashboard/mproduct"><ListGroupItem style={{backgroundColor:"#f5ad3f",color:"black"}}><FaDatabase/>Product</ListGroupItem></Link>
        </ListGroup>
      </div>
      <Route  path='/dashboard/product' > <Productlist handleChange={handleChange}/></Route>
      <Route  path='/dashboard/mproduct' > <Mproduct/></Route>
      <Route  path='/dashboard/mcategories' > <Mcategories/></Route>
      <Route  path='/dashboard/cart' > <Cart/></Route>
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

export default withRouter(connect(mapStateToProps)(Dashboard));
