export type Cell = {
  row: number;
  col: number;
  isWall: boolean;
  isPath: boolean;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
};

export type MazeGrid = Cell[][];

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate maze using recursive backtracking
export const generateMaze = (rows: number, cols: number): MazeGrid => {
  // Initialize grid with all walls
  const maze: MazeGrid = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      isWall: true,
      isPath: false,
      isVisited: false,
      isStart: row === 0 && col === 0,
      isEnd: row === rows - 1 && col === cols - 1,
    }))
  );

  // Carve passages using recursive backtracking
  const stack: [number, number][] = [];
  const startRow = 0;
  const startCol = 0;
  
  maze[startRow][startCol].isWall = false;
  maze[startRow][startCol].isVisited = true;
  stack.push([startRow, startCol]);

  const directions = [
    [0, 2],   // right
    [2, 0],   // down
    [0, -2],  // left
    [-2, 0],  // up
  ];

  while (stack.length > 0) {
    const [currentRow, currentCol] = stack[stack.length - 1];
    const shuffledDirections = shuffleArray(directions);
    let foundUnvisited = false;

    for (const [dRow, dCol] of shuffledDirections) {
      const newRow = currentRow + dRow;
      const newCol = currentCol + dCol;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !maze[newRow][newCol].isVisited
      ) {
        // Carve passage
        maze[newRow][newCol].isWall = false;
        maze[newRow][newCol].isVisited = true;
        
        // Carve wall between current and new cell
        const wallRow = currentRow + dRow / 2;
        const wallCol = currentCol + dCol / 2;
        maze[wallRow][wallCol].isWall = false;
        maze[wallRow][wallCol].isVisited = true;

        stack.push([newRow, newCol]);
        foundUnvisited = true;
        break;
      }
    }

    if (!foundUnvisited) {
      stack.pop();
    }
  }

  // Ensure start and end are not walls
  maze[0][0].isWall = false;
  maze[rows - 1][cols - 1].isWall = false;

  // Reset visited flags for solving
  maze.forEach(row => row.forEach(cell => (cell.isVisited = false)));

  return maze;
};

// Solve maze using DFS with backtracking
export const solveMaze = (maze: MazeGrid): Cell[] => {
  const rows = maze.length;
  const cols = maze[0].length;
  const path: Cell[] = [];
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const dfs = (row: number, col: number): boolean => {
    // Check bounds and if cell is valid
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      maze[row][col].isWall ||
      visited[row][col]
    ) {
      return false;
    }

    // Mark as visited and add to path
    visited[row][col] = true;
    path.push(maze[row][col]);

    // Check if reached the end
    if (row === rows - 1 && col === cols - 1) {
      return true;
    }

    // Try all 4 directions
    const directions = [
      [0, 1],  // right
      [1, 0],  // down
      [0, -1], // left
      [-1, 0], // up
    ];

    for (const [dRow, dCol] of directions) {
      if (dfs(row + dRow, col + dCol)) {
        return true;
      }
    }

    // Backtrack
    path.pop();
    return false;
  };

  dfs(0, 0);
  return path;
};
