import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {postRegister} from '../Public/Redux/Actions/auth';
import { Link} from "react-router-dom";

const Register = (props) => {
    const initialFormState = { username: "", password: "", email: "" };
    const [input, setInput] = useState(initialFormState);
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await props.dispatch(postRegister (input))
        } catch (error) {
          console.log(error);
        }
    };

    console.log(props.response)

    const handleChange = nameName => event => {
        setInput({ ...input, [nameName]: event.target.value });
    };
   // console.log("VVV")
  //  console.log("Respon>",response.status)
    return(
        <div className="container">
            <div className="pr-5 p-5 m-5 mx-auto text-white  " style={{backgroundColor:"#000000",width:"40%",padding: "10px",boxShadow: "5px 10px 8px 10px #888888"}} >
            <h2 className="text-center pb-1">Register</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label >Email</Label>
                    <Input type="email" placeholder="Insert E-mail"
                    onChange={handleChange("email")}
                    value={input.email} />
                </FormGroup>
                <FormGroup>
                    <Label >Username</Label>
                    <Input type="text"  placeholder="Insert Username"
                    onChange={handleChange("username")}
                    value={input.username} />
                </FormGroup>
                <FormGroup>
                    <Label >Password</Label>
                    <Input type="password"  placeholder="Insert Password"
                    onChange={handleChange("password")}
                    value={input.password}/>
                </FormGroup>
                <div className="text-left">
                <Button className="mb-2 bg-warning" color="warning">Register</Button><br/>
                <Link  to="/">Signin</Link>
                </div>
            </Form>
        </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
      registerMessage: state.auth.registerMessage,
      registerStatus: state.auth.registerStatus,
    };
  };

export default connect (mapStateToProps) (Register);

