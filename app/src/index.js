import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.tsx';
import Cookies from 'js-cookie';

import SignIn from './components/login/SignIn.tsx';
import SignUp from './components/login/SignUp.tsx';
import Tutorial from './tutorial/Tutorial.tsx';
import Pages from './tutorial/Pages.tsx';
import Customization from './tutorial/Customization.tsx';
import Canvas from './tutorial/Canvas.tsx';
import Styling from './tutorial/Styling.tsx';
import RouteLinks from './tutorial/RouteLinks.tsx';
import ReusableComponents from './tutorial/ReusableComponents.tsx';
import ComponentTree from './tutorial/ComponentTree.tsx';
import HtmlElements from './tutorial/HtmlElements.tsx';
import CodePreview from './tutorial/CodePreview.tsx';

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return Cookies.get('ssid') || window.localStorage.getItem('ssid') ? (
        <Component {...props} />
        ) : (
          <Redirect to="/login" />
          )
      }
    }
  />
);

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <PrivateRoute exact path="/" component={App} />
      <Route exact path="/tutorial" component={Tutorial}/>
      <Route exact path="/pages" component={Pages}/>
      <Route exact path="/links" component={RouteLinks}/>
      <Route exact path="/code-preview" component={CodePreview}/>
      <Route exact path="/reusable-components" component={ReusableComponents}/>
      <Route exact path="/component-tree" component={ComponentTree}/>
      <Route exact path="/html-elements" component={HtmlElements}/>
      <Route exact path="/styling" component={Styling}/>
      <Route exact path="/customization" component={Customization}/>
      <Route exact path="/canvas" component={Canvas}/>
    </Switch>
  </Router>,
  document.getElementById('app')
);