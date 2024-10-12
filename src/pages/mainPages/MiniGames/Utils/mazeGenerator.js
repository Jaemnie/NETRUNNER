export const generateMaze = (cols, rows) => {
    const grid = [];
    for (let y = 0; y < rows; y++) {
      const row = [];
      for (let x = 0; x < cols; x++) {
        row.push({
          x,
          y,
          walls: { top: true, right: true, bottom: true, left: true },
          visited: false,
        });
      }
      grid.push(row);
    }
  
    const stack = [];
    const startCell = grid[0][0];
    startCell.visited = true;
    stack.push(startCell);
  
    const getNeighbors = (cell) => {
      const neighbors = [];
      const { x, y } = cell;
  
      if (y > 0) neighbors.push(grid[y - 1][x]); // 상
      if (x < cols - 1) neighbors.push(grid[y][x + 1]); // 우
      if (y < rows - 1) neighbors.push(grid[y + 1][x]); // 하
      if (x > 0) neighbors.push(grid[y][x - 1]); // 좌
  
      return neighbors.filter((neighbor) => !neighbor.visited);
    };
  
    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = getNeighbors(current);
  
      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        next.visited = true;
  
        if (next.x === current.x && next.y === current.y - 1) {
          current.walls.top = false;
          next.walls.bottom = false;
        } else if (next.x === current.x + 1 && next.y === current.y) {
          current.walls.right = false;
          next.walls.left = false;
        } else if (next.x === current.x && next.y === current.y + 1) {
          current.walls.bottom = false;
          next.walls.top = false;
        } else if (next.x === current.x - 1 && next.y === current.y) {
          current.walls.left = false;
          next.walls.right = false;
        }
  
        stack.push(next);
      } else {
        stack.pop();
      }
    }
  
    return grid;
  };
  