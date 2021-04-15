import './App.css';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Signup from './Pages/Signup/Signup';
import Admin from './Pages/Admin/Admin';
import AutoGen from './Pages/AutoGen/AutoGen';
import React, { useState } from 'react';
//import useToken from "./UseToken";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';

function App() {
  const [token, setToken] = useState(
    localStorage.getItem('token') == undefined
      ? undefined
      : localStorage.getItem('token') === 'true'
  );

  // const { token, setToken } = useToken();
  if (token == undefined) {
    return (
      <BrowserRouter>
        <div className='App'>
          <Login setToken={setToken} />
        </div>
      </BrowserRouter>
    );
  } else if (token == true) {
    return (
      <BrowserRouter>
        <div className='App'>
          <Admin setToken={setToken} />
        </div>
      </BrowserRouter>
    );
  } else if (token == false) {
    return (
      <BrowserRouter>
        <div className='App'>
          <Dashboard setToken={setToken} />
        </div>
      </BrowserRouter>
    );
  } else if (token == 'sign') {
    return (
      <BrowserRouter>
        <div className='App'>
          <Signup setToken={setToken} />
        </div>
      </BrowserRouter>
    );
  } else if (token == 'auto') {
    return (
      <BrowserRouter>
        <div className='App'>
          <AutoGen setToken={setToken} path='/auto' />
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className='App'>
        {/* <Login /> */}
        <Switch>
          {/* <Route path="/" exact component={Login} setToken={setToken} />
          <Route path="/dashboard" exact component={Dashboard} /> */}
          <Route path='/Signup' exact component={Signup} />

          {/* <Route path="/Admin" exact component={Admin} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
