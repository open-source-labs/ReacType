import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.tsx';
import Cookies from 'js-cookie';

import SignIn from './components/login/SignIn.tsx';
import SignUp from './components/login/SignUp.tsx';
import Tutorial from './tutorial/Tutorial.tsx';
import TutorialPage from './tutorial/TutorialPages.tsx';


import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return Cookies.get('ssid') || window.localStorage.getItem('ssid') ? (
        <Component {...props} />
        ) : (
          <Redirect to="/login" />
          )
      }
    }
  />
);

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <PrivateRoute exact path="/" component={App} />
      <Route exact path="/tutorial" component={Tutorial}/>
      <Route exact path="/tutorialPage" component={TutorialPage} />
    </Switch>
  </Router>,
  document.getElementById('app')
);
