import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.tsx';
import store from './store';

import SignIn from './components/login/SignIn.tsx';
import SignUp from './components/login/SignUp.tsx';
import { 
  HashRouter as Router, 
  Route,
  Redirect, 
  Switch } from 'react-router-dom';

/*
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
*/

/*
The first file that loads 
If cookie is valid, send the user to app and set the login boolean to true
If the cookie has expired, send the user back to login
*/

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    false
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {/* change route to signin later for official release */}
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        {/* <Route exact path="/app" component={App} /> */}
        <PrivateRoute path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
