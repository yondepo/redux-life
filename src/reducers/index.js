import {combineReducers} from 'redux';
import board from './boardReducer';
import profile from './profileReducer';

export default combineReducers({
  board,
  profile
});
