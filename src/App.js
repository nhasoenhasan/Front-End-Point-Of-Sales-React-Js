import React from 'react';
import {BrowserRouter,withRouter,Route,Switch,Redirect} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Resgister';
import Dashboard from './Component/Dashboard/Dashboard';
import {setToken} from '../.../../src/Component/Public/Redux/Actions/auth';

const App = () => {
  const token = localStorage.getItem("xaccess-token");
 const dispatch=useDispatch();

  const Token=async()=>{
    await dispatch(setToken (token))
  }

  const RequireAuth = ({ children }) => {
    if (!token) {
      return <Redirect to={"/login"} />;
    }
    Token()
    return  children
  };
 
  return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <RequireAuth>
          <Route exact path="/" >
            <Redirect to={"/dashboard"} />
          </Route>
          <Route path="/dashboard" component={Dashboard} />
        </RequireAuth>
      </Switch>
  );
}

export default withRouter(App);
