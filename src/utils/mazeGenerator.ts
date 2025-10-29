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

export type Algorithm = "DFS" | "BFS" | "ASTAR";

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

// Reconstruct path from a map of predecessors
const reconstructPath = (prev: Map<string, string>, endKey: string, maze: MazeGrid): Cell[] => {
  const path: Cell[] = [];
  let current: string | undefined = endKey;
  while (current) {
    const [r, c] = current.split(",").map(Number);
    path.push(maze[r][c]);
    current = prev.get(current);
  }
  return path.reverse();
};

const keyOf = (r: number, c: number) => `${r},${c}`;

const getNeighbors = (r: number, c: number, rows: number, cols: number) => {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const res: [number, number][] = [];
  for (const [dr, dc] of dirs) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) res.push([nr, nc]);
  }
  return res;
};

const heuristic = (r: number, c: number, gr: number, gc: number) => Math.abs(r - gr) + Math.abs(c - gc);

// Unified solver supporting DFS, BFS, and A*
export const solveMaze = (maze: MazeGrid, algorithm: Algorithm = "DFS"): Cell[] => {
  const rows = maze.length;
  const cols = maze[0].length;
  const start = { r: 0, c: 0 };
  const goal = { r: rows - 1, c: cols - 1 };

  if (maze[start.r][start.c].isWall || maze[goal.r][goal.c].isWall) return [];

  if (algorithm === "DFS") {
    const path: Cell[] = [];
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

    const dfs = (r: number, c: number): boolean => {
      if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
      if (maze[r][c].isWall || visited[r][c]) return false;
      visited[r][c] = true;
      path.push(maze[r][c]);
      if (r === goal.r && c === goal.c) return true;
      for (const [nr, nc] of getNeighbors(r, c, rows, cols)) {
        if (dfs(nr, nc)) return true;
      }
      path.pop();
      return false;
    };

    dfs(start.r, start.c);
    return path;
  }

  if (algorithm === "BFS") {
    const q: [number, number][] = [[start.r, start.c]];
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    const prev = new Map<string, string>();
    visited[start.r][start.c] = true;

    while (q.length) {
      const [r, c] = q.shift()!;
      if (r === goal.r && c === goal.c) {
        return reconstructPath(prev, keyOf(r, c), maze);
      }
      for (const [nr, nc] of getNeighbors(r, c, rows, cols)) {
        if (!visited[nr][nc] && !maze[nr][nc].isWall) {
          visited[nr][nc] = true;
          prev.set(keyOf(nr, nc), keyOf(r, c));
          q.push([nr, nc]);
        }
      }
    }
    return [];
  }

  // A* Search
  type Node = { r: number; c: number; g: number; f: number };
  const open: Node[] = [{ r: start.r, c: start.c, g: 0, f: heuristic(start.r, start.c, goal.r, goal.c) }];
  const inOpen = new Map<string, Node>();
  inOpen.set(keyOf(start.r, start.c), open[0]);
  const closed = new Set<string>();
  const prev = new Map<string, string>();

  while (open.length) {
    // pick node with lowest f
    open.sort((a, b) => a.f - b.f);
    const current = open.shift()!;
    inOpen.delete(keyOf(current.r, current.c));
    const ckey = keyOf(current.r, current.c);
    if (current.r === goal.r && current.c === goal.c) {
      return reconstructPath(prev, ckey, maze);
    }
    closed.add(ckey);

    for (const [nr, nc] of getNeighbors(current.r, current.c, rows, cols)) {
      if (maze[nr][nc].isWall) continue;
      const nkey = keyOf(nr, nc);
      if (closed.has(nkey)) continue;
      const tentativeG = current.g + 1;
      const h = heuristic(nr, nc, goal.r, goal.c);
      const f = tentativeG + h;

      const existing = inOpen.get(nkey);
      if (!existing || tentativeG < existing.g) {
        prev.set(nkey, ckey);
        const node: Node = { r: nr, c: nc, g: tentativeG, f };
        if (!existing) {
          open.push(node);
          inOpen.set(nkey, node);
        } else {
          existing.g = tentativeG;
          existing.f = f;
        }
      }
    }
  }

  return [];
};

export const solveMazeWithSteps = (
  maze: MazeGrid,
  algorithm: Algorithm = "DFS"
): { visitedOrder: { row: number; col: number }[]; path: Cell[] } => {
  const rows = maze.length;
  const cols = maze[0].length;
  const start = { r: 0, c: 0 };
  const goal = { r: rows - 1, c: cols - 1 };
  const visitedOrder: { row: number; col: number }[] = [];

  if (maze[start.r][start.c].isWall || maze[goal.r][goal.c].isWall) return { visitedOrder, path: [] };

  if (algorithm === "DFS") {
    const path: Cell[] = [];
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    let found = false;

    const dfs = (r: number, c: number): boolean => {
      if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
      if (maze[r][c].isWall || visited[r][c]) return false;
      visited[r][c] = true;
      visitedOrder.push({ row: r, col: c });
      path.push(maze[r][c]);
      if (r === goal.r && c === goal.c) {
        found = true;
        return true;
      }
      for (const [nr, nc] of getNeighbors(r, c, rows, cols)) {
        if (dfs(nr, nc)) return true;
      }
      path.pop();
      return false;
    };

    dfs(start.r, start.c);
    return { visitedOrder, path: found ? path : [] };
  }

  if (algorithm === "BFS") {
    const q: [number, number][] = [[start.r, start.c]];
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    const prev = new Map<string, string>();
    visited[start.r][start.c] = true;

    while (q.length) {
      const [r, c] = q.shift()!;
      visitedOrder.push({ row: r, col: c });
      if (r === goal.r && c === goal.c) {
        const p = reconstructPath(prev, keyOf(r, c), maze);
        return { visitedOrder, path: p };
      }
      for (const [nr, nc] of getNeighbors(r, c, rows, cols)) {
        if (!visited[nr][nc] && !maze[nr][nc].isWall) {
          visited[nr][nc] = true;
          prev.set(keyOf(nr, nc), keyOf(r, c));
          q.push([nr, nc]);
        }
      }
    }
    return { visitedOrder, path: [] };
  }

  // A*
  type Node = { r: number; c: number; g: number; f: number };
  const open: Node[] = [{ r: start.r, c: start.c, g: 0, f: heuristic(start.r, start.c, goal.r, goal.c) }];
  const inOpen = new Map<string, Node>();
  inOpen.set(keyOf(start.r, start.c), open[0]);
  const closed = new Set<string>();
  const prev = new Map<string, string>();

  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift()!;
    inOpen.delete(keyOf(current.r, current.c));
    const ckey = keyOf(current.r, current.c);
    visitedOrder.push({ row: current.r, col: current.c });
    if (current.r === goal.r && current.c === goal.c) {
      return { visitedOrder, path: reconstructPath(prev, ckey, maze) };
    }
    closed.add(ckey);

    for (const [nr, nc] of getNeighbors(current.r, current.c, rows, cols)) {
      if (maze[nr][nc].isWall) continue;
      const nkey = keyOf(nr, nc);
      if (closed.has(nkey)) continue;
      const tentativeG = current.g + 1;
      const h = heuristic(nr, nc, goal.r, goal.c);
      const f = tentativeG + h;
      const existing = inOpen.get(nkey);
      if (!existing || tentativeG < existing.g) {
        prev.set(nkey, ckey);
        const node: Node = { r: nr, c: nc, g: tentativeG, f };
        if (!existing) {
          open.push(node);
          inOpen.set(nkey, node);
        } else {
          existing.g = tentativeG;
          existing.f = f;
        }
      }
    }
  }

  return { visitedOrder, path: [] };
};
