import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input,Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {postRegister} from '../Public/Redux/Actions/auth';

const Register = (props) => {
    const initialFormState = { username: "", password: "", email: "" };
    const [input, setInput] = useState(initialFormState);
    const [response, setResponse] = useState({status: "", message:"",email:"",username:""});
    const [visible, setVisible] = useState(true);
   
    const onDismiss = () => setVisible(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await props.dispatch(postRegister (input))
        .then(result => {
          setResponse(
            {status: result.value.data.status,
             message:result.value.data.message
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
   // console.log("VVV")
   console.log("Respon>",response.status)
    return(
        <div className="container">
         
          {/* Alert Success Register */}
          {response.status ===200?(
            <Alert color="success" toggle={onDismiss} isOpen={visible} fade={false}>
            {response.message}<br/>
            Username:{response.username}<br/>
            Password:{response.email}<br/>
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
            <h4>Register</h4>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label >Email</Label>
                    <Input type="email" placeholder="with a placeholder"
                    onChange={handleChange("email")}
                    value={input.email} />
                </FormGroup>
                <FormGroup>
                    <Label >Username</Label>
                    <Input type="text"  placeholder="with a placeholder"
                    onChange={handleChange("username")}
                    value={input.username} />
                </FormGroup>
                <FormGroup>
                    <Label >Password</Label>
                    <Input type="password"  placeholder="password placeholder"
                    onChange={handleChange("password")}
                    value={input.password}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
      response: state.auth.registerResponse
    };
  };

export default connect (mapStateToProps) (Register);

