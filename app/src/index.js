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
// import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import App from './components/App.tsx';
import SignIn from './components/login/SignIn.tsx';
import SignUp from './components/login/SignUp.tsx';
import FBPassWord from './components/login/FBPassWord.tsx';
import Tutorial from './tutorial/Tutorial.tsx';
import TutorialPage from './tutorial/TutorialPage.tsx';
import ProjectDashboard from './Dashboard/ProjectContainer.tsx';

const client = new ApolloClient({
  uri: 'https://reactype-caret.herokuapp.com/graphql',
  cache: new InMemoryCache()
});
// const initialState = { code: ``, input: `` };
// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SAVE':
//       return { ...state, code: action.payload };
//     case 'INPUT':
//       return { ...state, input: action.payload };
//     default:
//       return state;
//   }
// };

// export const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
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
