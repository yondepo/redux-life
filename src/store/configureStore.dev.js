import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import reducers from '../reducers';

export default function configureStore(initialState) {
  return createStore(reducers, initialState, compose(
      applyMiddleware(reduxImmutableStateInvariant()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
