import * as types from '../constants/actionTypes';

export function start(startedAt) {
  return {
    type: types.START,
    startedAt
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

export function changeLayout(value) {
  return {
    type: types.CHANGE_LAYOUT,
    value
  };
}

export function changeSlowdown(value) {
  return {
    type: types.CHANGE_SPEED,
    value
  };
}

export function random() {
  return {
    type: types.RANDOM
  };
}

export function tick(payload) {
  return {
    type: types.TICK,
    payload
  };
}

export function resizeView(winWidth) {
  return {
    type: types.RESIZE_VIEW,
    winWidth
  };
}
