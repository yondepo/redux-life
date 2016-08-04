import React, {PropTypes} from 'react';
import * as styles from '../../constants/styles';

const onMouseEvent = (toggle, alive) => (e) => {
  if (e.nativeEvent.which !== 1) { return; }
  toggle(alive);
};

const CellSVG = ({point, current, toggle, cellDim}) => {
  return (
    <rect
      width={cellDim}
      height={cellDim}
      stroke={styles.STROKE_COLOR}
      strokeWidth="0.5"
      onMouseOver={onMouseEvent(toggle, point)}
      onMouseDown={onMouseEvent(toggle, point)}
      fill={current
        ? (current == 1
          ? styles.BORN_CELL_COLOR
          : styles.ALIVE_CELL_COLOR )
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
