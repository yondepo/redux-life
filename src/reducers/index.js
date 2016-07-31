import {combineReducers} from 'redux';
import grid from './gridReducer';
import profile from './profileReducer';

export default combineReducers({
  grid,
  profile
});
