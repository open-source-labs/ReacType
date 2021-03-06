import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import App from './components/App.tsx';
import SignIn from './components/login/SignIn.tsx';
import SignUp from './components/login/SignUp.tsx';
import FBPassWord from './components/login/FBPassWord.tsx';
import Tutorial from './tutorial/Tutorial.tsx';
import TutorialPage from './tutorial/TutorialPage.tsx';

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';


/*
*  Dashboard
*/
// import TestDashboard from './Dashboard/FormsContainer.jsx';
import ProjectDashboard from './Dashboard/ProjectContainer.jsx';

import styles from './Dashboard/styles.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

/*
*  
*/


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ (props) => {
      return Cookies.get('ssid') || window.localStorage.getItem('ssid') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/password" component={FBPassWord} />
        <PrivateRoute exact path="/" component={App} />
        <Route exact path="/dashboard" component={ProjectDashboard} />
        <Route exact path="/tutorial" component={Tutorial} />
        <Route exact path="/tutorialPage/:learn" component={TutorialPage} />
      </Switch>
    </Router>
  </ ApolloProvider>,
  document.getElementById('app')
);
