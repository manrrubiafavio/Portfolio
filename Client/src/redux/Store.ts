import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './Reducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose; // Declara la variable global para Redux DevTools
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// eslint-disable-next-line
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);


export default store;
