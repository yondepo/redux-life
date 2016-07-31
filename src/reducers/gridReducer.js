import * as types from '../constants/actionTypes';

const DEFAULT_SIZE = 20;
const initialState = Array(DEFAULT_SIZE).fill(Array(DEFAULT_SIZE).fill(0));

function set(i, value, xs) {
  return [
    ...xs.slice(0, i),
    value,
    ...xs.slice(i + 1)
  ];
}

function toggle({x, y}, grid) {
  let current = grid[y][x];
  return set(y, set(x, +!current, grid[y]), grid);
}

export default function gridReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE:
      return toggle(action.cell, state);
    default:
      return state;
  }
}
