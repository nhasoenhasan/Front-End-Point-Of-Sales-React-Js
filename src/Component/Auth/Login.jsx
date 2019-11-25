import React,{useState} from "react";
import { Link} from "react-router-dom";
import {connect,useSelector} from 'react-redux';
import {postLogin} from '../Public/Redux/Actions/auth';

//------------------[Material UI]----------------------------------------
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Lawless
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

const Login = (props) => {
    const initialFormState = { username: "", password: "" };
    const [input, setInput] = useState(initialFormState);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const loginMessage = useSelector(state => state.auth.loginMessage)
    const isLoading = useSelector(state => state.auth.isLoading)
    console.log('Pesan',isLoading)

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleSubmit = async (event) => {
        if(input.username===''||input.username===''){
          setOpen(true);
        }else{
          event.preventDefault();
          try {
            const result=await props.dispatch(postLogin (input))
            if(result.action.payload.data.status===200){
              props.history.push('/dashboard/product');
            }else{
              setOpen(true);
              console.log('Message',result.action.payload.data.message)
            }
          } catch (error) {
            console.log(error);
          }
        }
    };

    const handleChange = nameName => event => {
        setInput({ ...input, [nameName]: event.target.value });
    };

    

    return(
          <Container component="main" maxWidth="xs">
            <div>
              {(input==='')}?
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={open}
                // autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
              message={<span id="message-id">{(input==='')?"Data Cant Be Empty":loginMessage}</span>}
                action={[
                  <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                    UNDO
                  </Button>,
                  <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={handleClose}
                  >
                    {/* <CloseIcon /> */}
                  </IconButton>,
                ]}
              />

            </div>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
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
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Sign In
                {isLoading && <CircularProgress size={24} color="secondary"/>}
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
          
        </Container>
        
    );
};

const mapStateToProps = state => {
    return {
      loginMessage: state.auth.loginMessage,
      loginStatus: state.auth.loginStatus,
      loginToken:state.auth.loginToken
    };
  };

export default connect (mapStateToProps)(Login);

