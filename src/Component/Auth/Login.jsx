import React,{useState} from "react";
import { Button, Form, FormGroup, Label, Input,Alert} from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {postLogin} from '../Public/Redux/Actions/auth';

const Login = (props) => {
    const initialFormState = { username: "", password: "" };
    const [input, setInput] = useState(initialFormState);
    const [response, setResponse] = useState({status: "", message:"",token:""});
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await props.dispatch(postLogin (input))
        .then(result => {
          setResponse(
            {status: result.value.data.status,
             message:result.value.data.message,
             token:result.value.data.token
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    };

    const handleChange = nameName => event => {
        setInput({ ...input, [nameName]: event.target.value });
    };



    return(
        <div className="container">
            {/* Alert Success Register */}
          {response.status ===200?(
            <Alert color="success" toggle={onDismiss} isOpen={visible} fade={false}>
            {response.message}<br/>
            </Alert>):
            (
              ""
            )}
            {/* Alert Failed Register */}
          {response.status ===400?(
            <Alert color="danger" toggle={onDismiss} isOpen={visible} fade={false}>
            {response.message}<br/>
            </Alert>):
            (
              ""
            )}
            <h4>Login</h4>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label >Username</Label>
                    <Input type="text"placeholder="with a placeholder" 
                      onChange={handleChange("username")}
                      value={input.username} />
                </FormGroup>
                <FormGroup>
                    <Label >Password</Label>
                    <Input type="password" placeholder="password placeholder" 
                    onChange={handleChange("password")}
                    value={input.password}/>
                </FormGroup>
                <Button color="success">Submit</Button>
            </Form>
            <Link to="/register">register now!</Link>
        </div>
    );
};

const mapStateToProps = state => {
    return {
      response: state.auth.loginResponse
    };
  };

export default connect (mapStateToProps)(Login);

