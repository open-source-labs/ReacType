import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.tsx';
import store from './store';

ReactDOM.render(
  // provide the redux store to the entire app
  <Provider store={store}>
    <App />
  </Provider>,
  // render the main app component within the div with an id of 'app' (./build/index.html)
  document.getElementById('app')
);
