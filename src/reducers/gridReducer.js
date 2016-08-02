import * as types from '../constants/actionTypes';

const DEFAULT_SIZE = 45;
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

function key(num, size) {
  if (num < 0) return size - 1;
  if (num >= size) return 0;
  return num;
}

function neighbours({x, y}, grid) {
  const size = grid.length;
  const offsets = [-1, 0, 1];

  let neighbours = 0;

  for (let offX of offsets) {
    const _x = key(x + offX, size);
    for (let offY of offsets) {
      if (!offX && !offY) continue;
      const _y = key(y + offY, size);
      neighbours += +!!grid[_y][_x];
    }
  }
  return neighbours;
}

function willLive(isCellAlive, neighbours) {
  return isCellAlive
    ? neighbours >= 2 && neighbours <= 3 && 1
    : neighbours == 3 && 2;
}

function nextGrid(grid) {
  return grid.map((row, y) =>
    row.map((cell, x) =>
      +willLive(cell, neighbours({x, y}, grid))
    )
  );
}

function isFrame(frame, slowdown) {
  if (!frame) return 1;
  return +(frame % slowdown == 0);
}

export default function gridReducer(state = initialState, action) {

  switch (action.type) {
    case types.TOGGLE:
      return toggle(action.cell, state);
    case types.TICK:
      if (isFrame(action.payload.frame, action.payload.slowdown)) {
        return nextGrid(state);
      }
      return state;
    case types.CLEAR:
      return initialState;
    case types.RESIZE:
      return Array(+action.value).fill(Array(+action.value).fill(0));
    default:
      return state;
  }
}