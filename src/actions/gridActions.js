import * as types from '../constants/actionTypes';

export function start() {
  return {
    type: types.START
  };
}

export function stop() {
  return {
    type: types.STOP
  };
}

export function toggle(cell) {
  return {
    type: types.TOGGLE,
    cell
  };
}

export function clear() {
  return {
    type: types.CLEAR
  };
}

export function random() {
  return {
    type: types.RANDOM
  };
}

export function tick() {
  return {
    type: types.TICK
  };
}
