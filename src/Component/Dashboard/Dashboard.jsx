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
//--------------------------[Material UI]------------------------------------
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fastfood from '@material-ui/icons/Fastfood';
import Equalizer from '@material-ui/icons/Equalizer';
import Add from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const drawerWidth = 150;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  drawerRight: {
    width: 370,
    flexShrink: 0,
  },
  drawerPaperRight: {
    width: 370,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const Dashboard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialFormState = { search: "",
                             sort: "",
                              order:"" };
  const [input, setInput] = useState(initialFormState);
  const classes = useStyles();
  const toggle = () => setIsOpen(!isOpen);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Lawless Jakarta
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
              <Link  to="/dashboard/product">
              <ListItem button >
                <ListItemIcon>
                   <Fastfood />
                </ListItemIcon>
                <ListItemText primary='Food' />
              </ListItem>
              </Link>
              <ListItem button >
                <ListItemIcon>
                   <Equalizer />
                </ListItemIcon>
                <ListItemText primary='Order' />
              </ListItem>
              <ListItem button onClick={handleClick}>
                <ListItemIcon >
                   <Add />
                </ListItemIcon>
                <ListItemText primary='Add' />
              </ListItem>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Product</MenuItem>
                <MenuItem onClick={handleClose}>Categories</MenuItem>
              </Menu>
          </List>
        </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <Route  path='/dashboard/product' > <Productlist handleChange={handleChange}/></Route>
              <Route  path='/dashboard/mproduct' > <Mproduct/></Route>
              <Route  path='/dashboard/mcategories' > <Mcategories/></Route>
              <Route  path='/dashboard/cart' > <Cart/></Route>
          </main>
          <Drawer
          className={classes.drawerRight}
          variant="permanent"
          classes={{
            paper: classes.drawerPaperRight,
          }}
          anchor="right"
        >
          <div className={classes.toolbar} />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <Add /> : <Add />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
      // -------------------------------------------------------------------------------------------------------- 
      // <Navbar style={{backgroundColor:"#000000"}} light className="fixed-top" expand="md"  >
      //   <NavbarBrand className="text-white" href="/"><img width="15%" src="http://lawlessjakarta.com/wp-content/uploads/2017/09/Lawless_burgerbar_header.gif"/></NavbarBrand><img style={{marginRight:"27%"}} width="15%" src={Logo}/>
        
      //   <NavbarToggler style={{backgroundColor:"white"}} onClick={toggle} />
        
      //   <Collapse  isOpen={isOpen} navbar>
      //     <Nav className="ml-auto " navbar>
      //       <Form className="form-inline my-2 my-lg-0">
      //       <Input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
      //       onChange={handleChange("search")}
      //       value={input.search}></Input>
      //     </Form>
      //     </Nav>
      //   </Collapse>
      //   <Link to="/dashboard/cart" className="text-white mr-3 ml-3"><FaShoppingBag/></Link>
      // </Navbar>
      // <div className="d-flex flex-row" >
      //   <ListGroup className="font-weight-bold text-white" style={{width:"11%",position:"fixed",height:"100%",marginTop:"5%",backgroundColor:"#f5ad3f"}}>
      //     <Link  to="/dashboard/product"><ListGroupItem style={{backgroundColor:"#f5ad3f",color:"black"}}><MdRestaurant/>Food</ListGroupItem>
      //     <ListGroupItem style={{backgroundColor:"#f5ad3f",color:"black"}}><FaChartLine/>Order</ListGroupItem></Link>
      //     <Link to="/dashboard/mcategories"><ListGroupItem style={{backgroundColor:"#f5ad3f",color:"black"}}><FaDatabase/>Categories</ListGroupItem></Link>
      //     <Link to="/dashboard/mproduct"><ListGroupItem style={{backgroundColor:"#f5ad3f",color:"black"}}><FaDatabase/>Product</ListGroupItem></Link>
      //   </ListGroup>
      // </div>
      // <Route  path='/dashboard/product' > <Productlist handleChange={handleChange}/></Route>
      // <Route  path='/dashboard/mproduct' > <Mproduct/></Route>
      // <Route  path='/dashboard/mcategories' > <Mcategories/></Route>
      // <Route  path='/dashboard/cart' > <Cart/></Route>
      // <div>
      // </div>
  );
}
const mapStateToProps = state => {
  return {
    products: state.product.productList
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
