export const convertGridToWalls = (grid, cellSize) => {
    const walls = [];
    const rows = grid.length;
    const cols = grid[0].length;
  
    grid.forEach((row) => {
      row.forEach((cell) => {
        const x = cell.x * cellSize;
        const y = cell.y * cellSize;
  
        if (cell.walls.top) {
          walls.push({ x1: x, y1: y, x2: x + cellSize, y2: y });
        }
  
        if (cell.walls.right) {
          walls.push({ x1: x + cellSize, y1: y, x2: x + cellSize, y2: y + cellSize });
        }
  
        if (cell.walls.bottom) {
          walls.push({ x1: x, y1: y + cellSize, x2: x + cellSize, y2: y + cellSize });
        }
  
        if (cell.walls.left) {
          walls.push({ x1: x, y1: y, x2: x, y2: y + cellSize });
        }
      });
    });
  
    return walls;
  };
  