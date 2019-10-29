import React from "react";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Link, Redirect } from "react-router-dom";

const Login = () => {
    return(
        <div className="container">
            <h4>Login</h4>
            <Form>
                <FormGroup>
                    <Label >Username</Label>
                    <Input type="text"placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label >Password</Label>
                    <Input type="password" placeholder="password placeholder" />
                </FormGroup>
                <Button color="success">Submit</Button>
            </Form>
            <Link to="/register">register now!</Link>
        </div>
    );
};

export default Login;

