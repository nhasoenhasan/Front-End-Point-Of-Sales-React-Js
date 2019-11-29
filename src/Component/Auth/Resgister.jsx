import React, { useState} from "react";
import { Form, FormGroup, Label, Input} from 'reactstrap';
import {connect,useSelector} from 'react-redux';
import {postRegister} from '../Public/Redux/Actions/auth';
import { Link} from "react-router-dom";
//------------------[Material UI]----------------------------------------
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CoffeMountain from '../../Assets/Images/CoffeMountain.png';
import CloseIcon from '@material-ui/icons/Close';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Coffe Mountain
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    logo: {
      margin: theme.spacing(1),
      width: 300,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));


const Register = (props) => {
    const initialFormState = { username: "", password: "", email: "" };
    const [input, setInput] = useState(initialFormState);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const registerMessage = useSelector(state => state.auth.registerMessage)
    const isLoading = useSelector(state => state.auth.isLoading)
    
    const handleSubmit = async (event) => {
        if(input.username===''||input.username===''||input.email===''){
            setOpen(true);
        }else{
            event.preventDefault();
            try {
              const result=await props.dispatch(postRegister (input))
              if(result.action.payload.data.status===200){
                props.history.push('/login');
              }else{
                setOpen(true);
              }
            } catch (error) {
              console.log(error);
            }
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const handleChange = nameName => event => {
        setInput({ ...input, [nameName]: event.target.value });
    };

    return(
        <Container component="main" maxWidth="xs">
            <div>
            {(input==='')}
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                backgroundcolor:"secondary"
                }}
                open={open}
                onClose={handleClose}
                ContentProps={{
                'aria-describedby': 'message-id',
                }}
                message={(input.username===''||input.password===''||input.email==='')?<span id="message-id" >Data Can't Be Empty</span>:<span id="message-id">{registerMessage}</span>}
                action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="secondary"
                    className={classes.close}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>,
                ]}
            />

            </div>
        <CssBaseline />
        <div className={classes.paper}> 
            <img alt="logo" className={classes.logo} src={CoffeMountain}></img>
            {/* <Typography component="h1" variant="h5" fontWeight="fontWeightBold" letterSpacing={6} m={1}>
            Sign Up
            </Typography> */}
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange("email")}
                value={input.email}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="usernama"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange("username")}
                value={input.username}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange("password")}
                value={input.password}
            />
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleSubmit}
                disabled={isLoading}
            >
                Sign Up
                {isLoading && <CircularProgress size={24} color="secondary"/>}
            </Button>
            <Grid container>
                <Grid item>
                <Link to="/login" variant="body2">
                    {"Sign in"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    //     <div className="container">
    //         <div className="pr-5 p-5 m-5 mx-auto text-white  " style={{backgroundColor:"#000000",width:"40%",padding: "10px",boxShadow: "5px 10px 8px 10px #888888"}} >
    //         <h2 className="text-center pb-1">Register</h2>
    //         <Form onSubmit={handleSubmit}>
    //             <FormGroup>
    //                 <Label >Email</Label>
    //                 <Input type="email" placeholder="Insert E-mail"
    //                 onChange={handleChange("email")}
    //                 value={input.email} />
    //             </FormGroup>
    //             <FormGroup>
    //                 <Label >Username</Label>
    //                 <Input type="text"  placeholder="Insert Username"
    //                 onChange={handleChange("username")}
    //                 value={input.username} />
    //             </FormGroup>
    //             <FormGroup>
    //                 <Label >Password</Label>
    //                 <Input type="password"  placeholder="Insert Password"
    //                 onChange={handleChange("password")}
    //                 value={input.password}/>
    //             </FormGroup>
    //             <div className="text-left">
    //             <Button className="mb-2 bg-warning" color="warning">Register</Button><br/>
    //             <Link  to="/login">Signin</Link>
    //             </div>
    //         </Form>
    //     </div>
    // </div>
    );
};

const mapStateToProps = state => {
    return {
      registerMessage: state.auth.registerMessage,
      registerStatus: state.auth.registerStatus,
    };
  };

export default connect (mapStateToProps) (Register);

