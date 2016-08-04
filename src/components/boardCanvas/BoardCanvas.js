import React, {PropTypes} from 'react';
import * as styles from '../../constants/styles';

function cell(props) {
  const {ctx, x, y, cellDim, current} = props;
  ctx.beginPath();
  ctx.rect(x * cellDim, y * cellDim, cellDim, cellDim);
  if (current) {
    ctx.fillStyle = current == 1
      ? styles.BORN_CELL_COLOR
      : styles.ALIVE_CELL_COLOR;
    ctx.fill();
  }
  ctx.stroke();
}

function getCell(point, cellDim) {
  let x = Math.floor(point.x / cellDim);
  let y = Math.floor(point.y / cellDim);
  return {x, y};
}

class BoardCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.updateCanvas = this.updateCanvas.bind(this);
    this.onMouseEvent = this.onMouseEvent.bind(this);
  }

  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }

  onMouseEvent(e) {
    if (e.nativeEvent.which != 1) return;
    const canvas = this.refs.canvas;
    let rect = canvas.getBoundingClientRect();
    let cell = getCell({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }, this.props.board.cellDim);
    this.props.toggle(cell);
  }

  updateCanvas() {
    const {grid, cellDim, boardDim} = this.props.board;
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillStyle = styles.DEFAULT_COLOR;
    ctx.fillRect(0, 0, boardDim, boardDim);
    ctx.strokeStyle = styles.STROKE_COLOR;
    ctx.lineWidth = 0.5;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
          cell({
            ctx,
            x, y,
            cellDim,
            current: grid[y][x]
          });
      }
    }
  }

  render() {
    return (
      <canvas
        width={this.props.board.boardDim}
        ref="canvas"
        height={this.props.board.boardDim}
        className="grid"
        onMouseDown={this.onMouseEvent}
        >
      </canvas>
    );
  }
}

BoardCanvas.propTypes = {
  board: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

export default BoardCanvas;
