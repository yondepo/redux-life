import React, {PropTypes} from 'react';
import CellSVG from './CellSVG';

const BoardSVG = ({board, toggle}) => {
  return (
    <svg
      width={board.boardDim}
      height={board.boardDim}
      className="grid">
      {board.grid.map((row, y) =>
        row.map((cell, x) =>
          <CellSVG
            key={x + '-' + y}
            toggle={toggle}
            point={{x, y}}
            current={cell}
            cellDim={board.cellDim}/>))}
    </svg>
  );
};

BoardSVG.propTypes = {
  board: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

export default BoardSVG;
