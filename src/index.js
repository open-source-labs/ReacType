import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.tsx';
import store from './store';

import SignIn from './components/login/SignIn.tsx';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);


/*
ReactDOM.render(
  <SignIn/>,
  document.getElementById('app'),
);
*/