import React, {PropTypes} from 'react';
import Row from './Row';

const Grid = ({grid, toggle}) => {
  return (
    <table className="grid">
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
