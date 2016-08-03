import * as types from '../constants/actionTypes';
import * as dims from '../constants/boardDims';

const DEFAULT_SIZE = 45;
const DEFAULT_BOARD_DIM = dims.BOARD_DIM_SMALL;
const DEFAULT_CELL_DIM = DEFAULT_BOARD_DIM / DEFAULT_SIZE;

const initialState = {
  grid: Array(DEFAULT_SIZE).fill(Array(DEFAULT_SIZE).fill(0)),
  cellDim: DEFAULT_CELL_DIM,
  boardDim: DEFAULT_BOARD_DIM
};

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

function calculateDims(winWidth) {
  let boardDim = 365;
  if (winWidth > 900) {
    boardDim = 450;
  }
  if (winWidth > 1200) {
    boardDim = 538;
  }
  let cellDim = boardDim / this.props.board.grid.length;
}

export default function gridReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE:
      return Object.assign({}, state, {
        grid: toggle(action.cell, state.grid)
      });
    case types.TICK:
      if (isFrame(action.payload.frame, action.payload.slowdown)) {
        return Object.assign({}, state, {
          grid: nextGrid(state.grid)
        });
      }
      return state;
    case types.CLEAR:
      return Object.assign({}, state, {
        grid: Array(+state.grid.length).fill(Array(+state.grid.length).fill(0))
      });
    case types.CHANGE_LAYOUT:
      return Object.assign({}, state, {
        grid: Array(+action.value).fill(Array(+action.value).fill(0))
      });
    default:
      return state;
  }
}
