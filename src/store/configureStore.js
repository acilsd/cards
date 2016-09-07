import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from '../reducers';

export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunk, logger)
  );
  if(module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
