import React, {PropTypes} from 'react';
import * as styles from '../../constants/styles';


const onMouseEvent = (toggle, alive) => (e) => {
  if (e.nativeEvent.which !== 1) { return; }
  toggle(alive);
};

const CellTD = ({point, current, toggle}) => {
  let backgroundColor = current
    ? (current == 1
      ? styles.BORN_CELL_COLOR
      : styles.ALIVE_CELL_COLOR )
    : styles.DEFAULT_COLOR;

  return (
    <td className="cell"
      onMouseOver={onMouseEvent(toggle, point)}
      onMouseDown={onMouseEvent(toggle, point)}
      style={{
        backgroundColor: backgroundColor,
        borderColor: styles.STROKE_COLOR,
        borderStyle: 'solid',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0
      }}>
    </td>
  );
};

CellTD.propTypes = {
  point: PropTypes.object.isRequired,
  current: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired
};

export default CellTD;
