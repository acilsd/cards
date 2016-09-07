import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { fetchData } from './actions';
import * as reducers from './reducers';
import routes from './routes';
import configureStore from './store/configureStore';
import styles from './style/custom.css';

reducers.routing = routerReducer;

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

const root = document.getElementById('root');

function run () {
  const state = store.getState();
  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    root
  );
}

function save() {
  const state = store.getState();

  fetch('/api/data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      decks: state.decks,
      cards: state.cards
    })
  });
}

function init () {
  run();
  store.subscribe(run);
  store.subscribe(save);
  store.dispatch(fetchData());
}

init();
