import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/AppNew.tsx';
import store from './store';

import SignIn from './components/login/SignIn.tsx';
import SignUp from './components/login/SignUp.tsx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

/*
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
*/

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {/* change route to signin later for official release */}
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/app" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
