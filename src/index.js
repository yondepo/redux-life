/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './styles/style.scss';
import App from './components/App';
import configureStore from './store/configureStore';
import {toggle} from './actions/gridActions';

let store = configureStore();

render(
  <App />,
  document.getElementById('app')
);
