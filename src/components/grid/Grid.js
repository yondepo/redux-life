import React, {PropTypes} from 'react';
import Row from './Row';

const Grid = ({grid, toggle}) => {
  let sizeClass = 'small';
  if (grid.length == 45) {
    sizeClass = 'medium';
  } else if (grid.length == 60) {
    sizeClass = 'large';
  }
  return (
    <table className={`grid ${sizeClass}`}>
      <tbody>
        {grid.map((row, y) => <Row key={y} row={row} y={y} toggle={toggle} />)}
      </tbody>
    </table>
  );
};

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Grid;
