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

/**
 * Initializes an Apollo Client for interacting with a GraphQL API.
 * The client is configured to use an in-memory cache.
 * @type {ApolloClient}
 */
const client = new ApolloClient({
  uri: 'https://reactype-caret.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

const isDev = import.meta.env.NODE_ENV === 'development';

/**
 * Configuration for server URLs, importing development port and API base URL from a server config file.
 * Adjusts the server URL based on whether the application is running in development mode.
 * @type {string}
 */
import serverConfig from './serverConfig.js';

const { DEV_PORT, API_BASE_URL } = serverConfig;
let serverURL = API_BASE_URL;

if (isDev) {
  serverURL = `http://localhost:${DEV_PORT}`;
}

/**
 * A private route component that only renders the specified component if the user is logged in.
 * If not logged in, it redirects the user to the login page. It checks both a server session and a guest login state
 * stored in localStorage.
 * @param {{component: React.ComponentType<any>, [x:string]: any}} props - The component to render and any additional route props.
 * @returns {React.ReactNode} - Either the specified component if the user is authenticated, a redirect component to the login page,
 * or null while waiting to verify user authentication.
 */
const PrivateRoute = ({ component: Component, ...rest }): React.ReactNode => {
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

/**
 * Initializes and renders the root component of the React application. It sets up the Apollo client with GraphQL,
 * the Redux store for state management, and the React Router for handling routing. It includes both protected and unprotected routes.
 * The application is wrapped with necessary providers for state management and data fetching.
 * @returns {void}
 */
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
