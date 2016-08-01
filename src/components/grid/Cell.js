import React, {PropTypes} from 'react';

const onMouseEvent = (toggle, alive) => (e) => {
  if (e.nativeEvent.which !== 1) { return; }
  toggle(alive);
};

const Cell = ({point, current, toggle}) => {
  return (
    <td className="cell"
      onMouseOver={onMouseEvent(toggle, point)}
      onMouseDown={onMouseEvent(toggle, point)}
      style={current
        ? (current == 1
          ? { backgroundColor: '#673AB7' } 
          : { backgroundColor: '#512DA8' })
        : null}>
    </td>
  );
};

Cell.propTypes = {
  point: PropTypes.object.isRequired,
  current: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Cell;
