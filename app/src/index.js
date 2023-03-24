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
import { addChild } from './redux/reducers/slice/appStateSlice.ts'

const socket = io('http://localhost:5656', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log(`You connected with id: ${socket.id}`)
})

console.log(store.getState())
let previousState = store.getState();

// sending info to backend whenever the redux store changes
function handleStoreChange () {
  socket.connect();
  const newState = store.getState();
  if (newState !== previousState){
    socket.emit('custom-event', 'sent from front-end', store.getState())
    previousState = newState;
  }
}

store.subscribe(handleStoreChange)

// receiving the message from the back end
socket.on('receive message', (event) => {
  console.log('message from server: ', event);
  const currentStore = store.getState();
  if (currentStore!==event){
    console.log('stores do not match')
    if (currentStore.darkMode.isDarkMode!==event.darkMode.isDarkMode){
      store.dispatch(toggleDarkMode())
    } 

      console.log("eventstate from precooperative",event.appState.components[0].children[1])
      const {type, typeId, childId} = event.appState.components[0].children[1]
      store.dispatch(addChild({type, typeId, childId}))
    
    
  }
  console.log('updated user Store from another user: ', store.getState())
})

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
