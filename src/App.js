import React from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Resgister';
import Dashboard from './Component/Dashboard/Dashboard';

const App = () => {
  const token = localStorage.getItem("xaccess-token");

  const RequireAuth = ({ children }) => {
    if (!token) {
      return <Redirect to={"/login"} />;
    }
    return  children
  };
 
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <RequireAuth>
          <Route path="/dashboard/" component={Dashboard} />
        </RequireAuth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
