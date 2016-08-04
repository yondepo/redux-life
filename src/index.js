/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './styles/style.scss';
import 'font-awesome/css/font-awesome.css';
import App from './components/App';
import configureStore from './store/configureStore';
import {setGrid} from './actions/boardActions';
import {generateGrid} from './lib/generation';

let store = configureStore();
store.dispatch(setGrid(generateGrid(store.getState().board.grid.length)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
