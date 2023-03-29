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
import App from './components/App.tsx';
import SignIn from './components/login/SignIn.tsx';
import SignUp from './components/login/SignUp.tsx';
import FBPassWord from './components/login/FBPassWord.tsx';
import Tutorial from './tutorial/Tutorial.tsx';
import TutorialPage from './tutorial/TutorialPage.tsx';
import ProjectDashboard from './Dashboard/ProjectContainer.tsx';

// for websockets
// import debounce from 'lodash/debounce';

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

// // websocket front end starts here
// import { io } from 'socket.io-client';
// import { toggleDarkMode } from './redux/reducers/slice/darkModeSlice';

// import { allCooperativeState } from './redux/reducers/slice/appStateSlice.ts';
// import { codePreviewCooperative } from './redux/reducers/slice/codePreviewSlice';
// import { allContextCooperative } from './redux/reducers/slice/contextReducer';
// import { cooperativeStyle } from './redux/reducers/slice/styleSlice';
// import config from '../../config';
// const { API_BASE_URL } = config;

// const socket = io(API_BASE_URL, {
//   transports: ['websocket']
// });

// socket.on('connect', () => {
//   console.log(`You connected with id: ${socket.id}`);
// });

// console.log(store.getState());
// let previousState = store.getState();

// // sending info to backend whenever the redux store changes
// const handleStoreChange = debounce(() => {
//   const newState = store.getState();
//   if (store.getState().roomCodeSlice.roomCode !== '') {
//     socket.emit('room-code', store.getState().roomCodeSlice.roomCode);
//   }
//   if (newState !== previousState) {
//     console.log('before sending to server: ', newState);
//     socket.emit(
//       'custom-event',
//       'sent from front-end',
//       JSON.stringify(newState),
//       store.getState().roomCodeSlice.roomCode
//     );
//     previousState = newState;
//   }
// }, 100);

// // receiving the message from the back end
// socket.on('receive message', (event) => {
//   // console.log('message from server: ', event);
//   let currentStore = JSON.stringify(store.getState());
//   if (currentStore !== event) {
//     currentStore = JSON.parse(currentStore);
//     event = JSON.parse(event);
//     console.log('stores do not match');
//     if (currentStore.darkMode.isDarkMode !== event.darkMode.isDarkMode) {
//       store.dispatch(toggleDarkMode());
//     } else if (currentStore.appState !== event.appState) {
//       store.dispatch(allCooperativeState(event.appState));
//     } else if (currentStore.codePreviewSlice !== event.codePreviewCooperative) {
//       store.dispatch(codePreviewCooperative(event.codePreviewCooperative));
//     } else if (currentStore.styleSlice !== event.styleSlice) {
//       store.dispatch(cooperativeStyle(event.styleSlice));
//     }
//   }
//   console.log('updated user Store from another user: ', store.getState());
// });

// store.subscribe(handleStoreChange);

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
