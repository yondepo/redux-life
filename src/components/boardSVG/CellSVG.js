import React, {PropTypes} from 'react';

const onMouseEvent = (toggle, alive) => (e) => {
  if (e.nativeEvent.which !== 1) { return; }
  toggle(alive);
};

const CellSVG = ({point, current, toggle, cellDim}) => {
  return (
    <rect
      width={cellDim}
      height={cellDim}
      stroke="#212121"
      strokeWidth="0.5"
      onMouseOver={onMouseEvent(toggle, point)}
      onMouseDown={onMouseEvent(toggle, point)}
      fill={current
        ? (current == 1
          ? '#4CAF50'
          : '#388E3C' )
        : null}
      x={point.x * cellDim}
      y={point.y * cellDim}>

    </rect>
  );
};

CellSVG.propTypes = {
  point: PropTypes.object.isRequired,
  current: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  cellDim: PropTypes.number.isRequired
};

export default CellSVG;
