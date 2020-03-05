import logger from 'redux-logger';
import throttle from 'lodash.throttle';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { saveState } from './localStorage';

let composer;
//compose lets you write deeply nested function transformations without the rightward drift of the code.
// Compose is used when you want to pass multiple store enhancers to the store. Store enhancers are higher order functions that add some extra functionality to the store. The only store enhancer which is supplied with Redux by default is applyMiddleware however many other are available.

if (process.env.NODE_ENV === 'development') {
  composer = compose(
    applyMiddleware(thunk), // re-add logger if you want redux log messages
    composeWithDevTools()
  );
} else {
  composer = compose(applyMiddleware(thunk));
}

const store = createStore(reducers, composer);

store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;
