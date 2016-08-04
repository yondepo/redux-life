import * as types from '../constants/actionTypes';
import * as dims from '../constants/boardDims';
import {DEFAULT_SIZE} from '../constants/options';
import {toggle, isFrame, nextGrid, calculateCellDim, calculateDims} from '../lib/board';

const DEFAULT_BOARD_DIM = dims.BOARD_DIM_SMALL;
const DEFAULT_CELL_DIM = DEFAULT_BOARD_DIM / DEFAULT_SIZE;

const initialState = {
  grid: Array(DEFAULT_SIZE).fill(Array(DEFAULT_SIZE).fill(0)),
  cellDim: DEFAULT_CELL_DIM,
  boardDim: DEFAULT_BOARD_DIM
};

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
    case types.SET_GRID:
      return Object.assign({}, state, {
        grid: action.grid
      });
    case types.CHANGE_LAYOUT:
      return Object.assign({}, state, {
        grid: Array(+action.value).fill(Array(+action.value).fill(0)),
        cellDim: calculateCellDim(state.boardDim, +action.value)
      });
    case types.RESIZE_VIEW:
      return Object.assign({}, state, calculateDims(action.winWidth, state.grid.length));
    default:
      return state;
  }
}
