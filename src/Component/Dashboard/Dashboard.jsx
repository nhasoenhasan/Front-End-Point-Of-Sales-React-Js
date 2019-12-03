  import React, { useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Productlist from '../Product/Product';
import {getProduct} from '../Public/Redux/Actions/product';
import {connect} from 'react-redux';
import { withRouter,Route,Link } from 'react-router-dom';
import Mproduct from '../Product/Manage/Mproduct'
import Mcategories from '../Categories/Mcategories';
import Cart from '../Order/Cartt';
import Historyorder from '../Order/Historyorder';
import {getOrder} from '../Public/Redux/Actions/product';
import CoffeMountain from '../../Assets/Images/CoffeMountain.png';
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
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';


const drawerWidth = 150;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'white'
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
  logo: {
    width: 150,
    height:70
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  imagecart: {
    maxWidth:350,
    maxHeight:400,
    width:300,
    height:300
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  linkmenu: {
      color: "black",
      textDecoration: 'none'
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  toolbar: theme.mixins.toolbar,
}));

const Dashboard = (props) => {
  const initialFormState = { search: "",
                             sort: "",
                              order:"" };
  const [input, setInput] = useState(initialFormState);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch=useDispatch();
  const token=useSelector(state=>state.auth.Token)
  
  const fetchddata=async()=>{
    await props.dispatch(getProduct (input,token))
    .then(result => {
      // console.log("Input",input)
      // console.log("Hasil",result)
    })
    .catch(err => {
      console.log(err);
    });
  }

  const handleChangeSwitch = name => event => {
    setState({ ...state, [name]: event.target.checked });
    const storage=localStorage.removeItem("xaccess-token");
    console.log('Storage',storage)
    props.history.push('/login');
  };

  const fetchddataOrder=async()=>{
    await dispatch(getOrder(token))
    .then(result => {
      // console.log(result)
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(()=>{
    fetchddata()
  },[input])

  useEffect(()=>{
    fetchddataOrder()
  },[])



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
          <img alt="logo" className={classes.logo} src={CoffeMountain}></img>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange("search")}
              value={input.search}
            />
          </div>
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
              <Link className={classes.linkmenu}  to="/dashboard">
              <ListItem button >
                <ListItemIcon>
                   <Fastfood />
                </ListItemIcon>
                <ListItemText className={classes.linkmenu} primary='Food' />
              </ListItem>
              </Link>
              <Link  to="/dashboard/order">
              <ListItem button >
                <ListItemIcon>
                   <Equalizer />
                </ListItemIcon>
                <ListItemText className={classes.linkmenu} primary='Order' />
              </ListItem>
              </Link>
              <ListItem button onClick={handleClick}>
                <ListItemIcon >
                   <Add  style={{ fontSize: 40,color:"#00ab2e" }} />
                </ListItemIcon>
                <ListItemText  className={classes.linkmenu} primary='Add'  />
              </ListItem>
              <Divider />
              <ListItem style={{marginTop:'10%'}} button >
                <ListItemIcon >
                    <Switch
                    onChange={handleClick}
                    checked={state.checkedA}
                    onChange={handleChangeSwitch('checkedA')}
                    value="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </ListItemIcon>
                <ListItemText  primary='Logout'  />
              </ListItem>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link  to="/dashboard/mproduct">
                <MenuItem className={classes.linkmenu} onClick={handleClose}>Product</MenuItem>
                </Link>
                <Link  to="/dashboard/mcategories">
                <MenuItem className={classes.linkmenu} onClick={handleClose}>Categories</MenuItem>
                </Link>
              </Menu>
          </List>
        </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <Route exact path='/dashboard' > <Productlist handleChange={handleChange}/></Route>
              <Route  path='/dashboard/mproduct' > <Mproduct/></Route>
              <Route  path='/dashboard/mcategories' > <Mcategories/></Route>
              <Route  path='/dashboard/order' > <Historyorder/></Route>
          </main>
          <Route exact path='/dashboard' > <Cart/></Route>
      </div>
  );
}
const mapStateToProps = state => {
  return {
    products: state.product.productList
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
