import React,{useState} from "react";
import { Button, Form, FormGroup, Label, Input,Alert} from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {postLogin} from '../Public/Redux/Actions/auth';

const Login = (props) => {
    const initialFormState = { username: "", password: "" };
    const [input, setInput] = useState(initialFormState);
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const result=await props.dispatch(postLogin (input))
          props.history.push('/dashboard/product');
        } catch (error) {
          console.log(error);
        }
    };

    const handleChange = nameName => event => {
        setInput({ ...input, [nameName]: event.target.value });
    };

    return(
        
        <div className="container mt-5 ">
            {/* Alert Success Register */}
            {/* {response.status ===200?(
              <Alert color="success" toggle={onDismiss} isOpen={visible} fade={false}>
              {response.message}<br/>
              </Alert>):
              (
                ""
              )}
              {/* Alert Failed Register */}
            {/* {response.status ===400?(
              <Alert color="danger" toggle={onDismiss} isOpen={visible} fade={false}>
              {response.message}<br/>
              </Alert>):
              (
                ""
              )} */} 
            <div className="pr-5 p-5 m-5 mx-auto text-white  " style={{backgroundColor:"#000000",width:"40%",padding: "10px",boxShadow: "5px 10px 8px 10px #888888"}} >
              <h2 className="text-center pb-1">Signin</h2>
              <Form onSubmit={handleSubmit} className="p-4">
                  <FormGroup>
                      <Label >Username</Label>
                      <Input type="text"placeholder="Insert Username" 
                        onChange={handleChange("username")}
                        value={input.username} />
                  </FormGroup>
                  <FormGroup>
                      <Label >Password</Label>
                      <Input type="password" placeholder="Insert Password" 
                      onChange={handleChange("password")}
                      value={input.password}/>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="mt-4 w-50 " color="warning">Signin</Button><br/>
                    <Link to="/register">register now!</Link>
                  </div>
              </Form>
              
          </div>
        </div>
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

