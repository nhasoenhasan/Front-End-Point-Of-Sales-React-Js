import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Resgister';
import Dashboard from './Component/Dashboard/Dashboard';


const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
}

export default App;
