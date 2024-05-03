import 'babel-polyfill';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './components/App';
import FBPassWord from './components/login/FBPassWord';
import ProjectDashboard from './Dashboard/ProjectContainer';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
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

const isDev = import.meta.env.NODE_ENV === 'development';
import serverConfig from './serverConfig.js';

const { DEV_PORT, API_BASE_URL } = serverConfig;
let serverURL = API_BASE_URL;

if (isDev) {
  serverURL = `http://localhost:${DEV_PORT}`;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const projects = fetch(`${serverURL}/loggedIn`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    })
      .then((res) => {
        if(!res.ok){
          throw new Error('Network Response was not ok')
        }
        return res.json();
      })
      .then((data) => {
        setIsLoggedIn(data);
      })
      .catch((err) => { 
        console.log(`Error getting project ${err}`)});
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          isLoggedIn === true ||
          window.localStorage.getItem('ssid') === 'guest'
        ) {
          return <Component {...props} />;
        } else if (isLoggedIn === false || isLoggedIn !== null) {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/password" component={FBPassWord} />
          <DndProvider backend={HTML5Backend}>
            <Route exact path="/marketplace" component={App} />
            <PrivateRoute exact path="/" component={App} />
          </DndProvider>
          <Route exact path="/dashboard" component={ProjectDashboard} />
        </Switch>
        <Route exact path="/tutorial" component={Tutorial} />
        <Route exact path="/tutorialPage/:learn" component={TutorialPage} />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('app')
);
