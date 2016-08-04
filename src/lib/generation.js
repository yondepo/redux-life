export const generateGrid = (size) =>
  Array(size).fill(Array(size).fill(0))
    .map((row) =>
      row.map((c) =>
        Math.random() > 0.8
          ? 1
          : 0
      )
    );
