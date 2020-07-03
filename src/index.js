import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.tsx';
import Cookies from 'js-cookie';

import SignIn from './components/login/SignIn.tsx';
import SignUp from './components/login/SignUp.tsx';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Cookies.get('ssid') ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <PrivateRoute path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById('app')
);
