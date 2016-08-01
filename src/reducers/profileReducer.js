import * as types from '../constants/actionTypes';

const initialState = {
  ticks: 0,
  frame: null,
  running: false,
  slowdown: 1
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case types.START:
      return Object.assign({}, state,{
        running: true
      });
    case types.STOP:
      return Object.assign({}, state, {
        running: false
      });
    case types.TICK:
      return Object.assign({}, state, {
        ticks: state.ticks + 1,
        frame: action.payload.frame
      });
    case types.CLEAR:
      return initialState;
    default:
      return state;
  }
}
