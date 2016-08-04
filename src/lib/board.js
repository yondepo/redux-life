function set(i, value, xs) {
  return [
    ...xs.slice(0, i),
    value,
    ...xs.slice(i + 1)
  ];
}

export function toggle({x, y}, grid) {
  let current = grid[y][x];
  return set(y, set(x, +!current, grid[y]), grid);
}

function key(num, size) {
  if (num < 0) return size - 1;
  if (num >= size) return 0;
  return num;
}

function neighbours({x, y}, grid) {
  const size = grid.length;
  const offsets = [-1, 0, 1];

  let neighbours = 0;

  for (let offX of offsets) {
    const _x = key(x + offX, size);
    for (let offY of offsets) {
      if (!offX && !offY) continue;
      const _y = key(y + offY, size);
      neighbours += +!!grid[_y][_x];
    }
  }
  return neighbours;
}

function willLive(isCellAlive, neighbours) {
  return isCellAlive
    ? neighbours >= 2 && neighbours <= 3 && 1
    : neighbours == 3 && 2;
}

export function nextGrid(grid) {
  return grid.map((row, y) =>
    row.map((cell, x) =>
      +willLive(cell, neighbours({x, y}, grid))
    )
  );
}

export function isFrame(frame, slowdown) {
  if (!frame) return 1;
  return +(frame % slowdown == 0);
}

export function calculateDims(winWidth, gridLength) {
  let boardDim = 365;
  if (winWidth > 900) {
    boardDim = 450;
  }
  if (winWidth > 1200) {
    boardDim = 538;
  }
  let cellDim = calculateCellDim(boardDim, gridLength);
  return {cellDim, boardDim};
}

export function calculateCellDim(boardDim, gridLength) {
  return boardDim / gridLength;
}
