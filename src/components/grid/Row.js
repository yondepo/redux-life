import React, {PropTypes} from 'react';
import Cell from './Cell';

const Row = ({row, y, toggle}) => {
  return (
    <tr>
      {row.map((cell, x) =>
        <Cell key={x} current={cell} point={{x, y}} toggle={toggle}/>)}
    </tr>
  );
};

Row.propTypes = {
  row: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
  y: PropTypes.number.isRequired
};

export default Row;
