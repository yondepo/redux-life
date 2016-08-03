import React, {PropTypes} from 'react';
import CellTD from './CellTD';

const Grid = ({board, toggle}) => {
  let sizeClass = 'small';
  if (board.grid.length == 45) {
    sizeClass = 'medium';
  } else if (board.grid.length == 60) {
    sizeClass = 'large';
  }
  return (
    <table
      className={`grid ${sizeClass}`}
      style={{
        width: board.boardDim,
        height: board.boardDim
      }}>
      <tbody>
        {board.grid.map((row, y) =>
          <tr key={y}>
            {row.map((cell, x) =>
              <CellTD
                key={x}
                toggle={toggle}
                point={{x, y}}
                current={cell}/>)}
          </tr>)}
      </tbody>
    </table>
  );
};

Grid.propTypes = {
  board: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Grid;
