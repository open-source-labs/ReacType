import 'babel-polyfill';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch
} from 'react-router-dom';

import App from './components/App';
import Cookies from 'js-cookie';
import FBPassWord from './components/login/FBPassWord';
import MarketplaceButton from './components/right/MarketplaceButton';
import MarketplaceContainer from './containers/MarketplaceContainer';
import ProjectDashboard from './Dashboard/ProjectContainer';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';
import Tutorial from './tutorial/Tutorial';
import TutorialPage from './tutorial/TutorialPage';
import store from './redux/store';

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
          <Route exact path="/marketplace" component={App} />
          <Route exact path="/tutorial" component={Tutorial} />
          <Route exact path="/tutorialPage/:learn" component={TutorialPage} />
        </Switch>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('app')
);
