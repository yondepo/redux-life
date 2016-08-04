import React, {PropTypes} from 'react';
import CellTD from './CellTD';
import * as styles from '../../constants/styles';

const BoardTD = ({board, toggle}) => {

  return (
    <table
      className={`grid`}
      style={{
        width: board.boardDim,
        height: board.boardDim,
        borderColor: styles.STROKE_COLOR,
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
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

BoardTD.propTypes = {
  board: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

export default BoardTD;
