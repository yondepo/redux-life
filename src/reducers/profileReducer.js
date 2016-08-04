import * as types from '../constants/actionTypes';
import {DEFAULT_SPEED, DEFAULT_TYPE} from '../constants/options';
import {calculateFPS, isFrame} from '../lib/profile';


const initialState = {
  ticks: 0,
  frame: null,
  slowdown: DEFAULT_SPEED,
  startedAt: null,
  fps: 0,
  ticksSinceStart: 0,
  type: DEFAULT_TYPE
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case types.START:
      return Object.assign({}, state,{
        startedAt: action.startedAt,
        ticksSinceStart: 0
      });
    case types.STOP:
      return Object.assign({}, state, {
        startedAt: null
      });
    case types.TICK:
      return Object.assign({}, state, {
        ticks: state.ticks + isFrame(action.payload.frame, action.payload.slowdown),
        ticksSinceStart: state.ticksSinceStart + isFrame(action.payload.frame, action.payload.slowdown),
        fps: calculateFPS(state.ticksSinceStart + 1, state.startedAt, action.payload.now),
        frame: action.payload.frame
      });
    case types.CHANGE_SPEED:
      return Object.assign({}, state, {
        slowdown: +action.value
      });
    case types.CHANGE_LAYOUT:
      return Object.assign({}, initialState, {
        slowdown: state.slowdown
      });
    case types.CLEAR:
      return Object.assign({}, initialState, {
        slowdown: state.slowdown
      });
    case types.CHANGE_TYPE:
      return Object.assign({}, state, {
        type: action.value
      });
    default:
      return state;
  }
}
