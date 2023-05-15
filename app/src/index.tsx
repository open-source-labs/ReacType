import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import 'babel-polyfill';
import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import App from './components/App';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';
import FBPassWord from './components/login/FBPassWord';
import Tutorial from './tutorial/Tutorial';
import TutorialPage from './tutorial/TutorialPage';
import ProjectDashboard from './Dashboard/ProjectContainer';

const client = new ApolloClient({
  uri: 'https://reactype-caret.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
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
    <Provider store={store}>
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
    </Provider>
  </ApolloProvider>,
  document.getElementById('app')
);
