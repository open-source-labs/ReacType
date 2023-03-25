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
import debounce from 'lodash/debounce'

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

// websocket front end starts here
import { io } from 'socket.io-client'
import { toggleDarkMode } from './redux/reducers/slice/darkModeSlice'

<<<<<<< HEAD
// in dev environment
// const socket = io('http://localhost:5656', {
//   transports: ['websocket']
// });

// in docker container
const socket = io(`http://${window.location.hostname}:5656`, {
  transports: ['websocket'],
=======
import { allCooperativeState } from './redux/reducers/slice/appStateSlice.ts'
import { codePreviewCooperative } from './redux/reducers/slice/codePreviewSlice';
import { allContextCooperative } from './redux/reducers/slice/contextReducer';
import { cooperativeStyle } from './redux/reducers/slice/styleSlice';


const socket = io('http://localhost:5656', {
  transports: ['websocket']
>>>>>>> dev
});

socket.on('connect', () => {
  console.log(`You connected with id: ${socket.id}`)
})

console.log(store.getState())
let previousState = store.getState();

// sending info to backend whenever the redux store changes
const handleStoreChange = debounce(() => {
  const newState = store.getState();
  if (newState !== previousState){
    console.log('before sending to server: ', newState)
    socket.emit('custom-event', 'sent from front-end', JSON.stringify(newState))
    previousState = newState;
  }
}, 100);

// receiving the message from the back end
socket.on('receive message', (event) => {
  // console.log('message from server: ', event);
  let currentStore = JSON.stringify(store.getState())
  if (currentStore!==event){
    currentStore = JSON.parse(currentStore);
    event = JSON.parse(event);
    console.log('stores do not match')
    if (currentStore.darkMode.isDarkMode!==event.darkMode.isDarkMode){
      store.dispatch(toggleDarkMode())
    } else if (currentStore.appState!==event.appState) {
      store.dispatch(allCooperativeState(event.appState))
    } else if (currentStore.codePreviewSlice!==event.codePreviewCooperative){
      store.dispatch(codePreviewCooperative(event.codePreviewCooperative))
    } else if (currentStore.styleSlice!==event.styleSlice) {
      store.dispatch(cooperativeStyle(event.styleSlice))
    } 
<<<<<<< HEAD

      console.log("eventstate from precooperative",event.appState.components[0].children[1])
      const {type, typeId, childId} = event.appState.components[0].children[1]
      store.dispatch(addChild({type, typeId, childId}))
    
    
=======
    // else {
    //   console.log('contextslice else if block is running: ', event.contextSlice.allContext[lastIndex])
    //   store.dispatch(allContextCooperative(event.contextSlice))
    // }
>>>>>>> 41e7144c6d708703d21ec0f269f012deb75d4aaf
  }
  console.log('updated user Store from another user: ', store.getState())
})

store.subscribe(handleStoreChange)

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
