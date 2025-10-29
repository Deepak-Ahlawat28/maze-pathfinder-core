import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const codeStyle =
  "whitespace-pre overflow-x-auto rounded-lg bg-background/60 border border-border p-4 text-sm leading-6";

const dfsCode = `// DFS (backtracking)
function dfs(maze) {
  const rows = maze.length, cols = maze[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const path = [];
  function walk(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (maze[r][c].isWall || visited[r][c]) return false;
    visited[r][c] = true;
    path.push([r, c]);
    if (r === rows - 1 && c === cols - 1) return true;
    for (const [dr, dc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      if (walk(r + dr, c + dc)) return true;
    }
    path.pop();
    return false;
  }
  walk(0, 0);
  return path;
}`;

const bfsCode = `// BFS (shortest path)
function bfs(maze) {
  const rows = maze.length, cols = maze[0].length;
  const q = [[0, 0]];
  const prev = new Map();
  const seen = Array.from({ length: rows }, () => Array(cols).fill(false));
  seen[0][0] = true;
  const key = (r, c) => r + ',' + c;
  while (q.length) {
    const [r, c] = q.shift();
    if (r === rows - 1 && c === cols - 1) {
      const path = [];
      let cur = key(r, c);
      while (cur) {
        const [rr, cc] = cur.split(',').map(Number);
        path.push([rr, cc]);
        cur = prev.get(cur);
      }
      return path.reverse();
    }
    for (const [dr, dc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      const nr = r + dr, nc = c + dc;
      if (nr>=0 && nr<rows && nc>=0 && nc<cols && !maze[nr][nc].isWall && !seen[nr][nc]) {
        seen[nr][nc] = true;
        prev.set(key(nr, nc), key(r, c));
        q.push([nr, nc]);
      }
    }
  }
  return [];
}`;

const aStarCode = `// A* (Manhattan heuristic)
function aStar(maze) {
  const rows = maze.length, cols = maze[0].length;
  const start = [0, 0], goal = [rows - 1, cols - 1];
  const key = (r, c) => r + ',' + c;
  const h = (r, c) => Math.abs(r - goal[0]) + Math.abs(c - goal[1]);
  const open = [{ r: 0, c: 0, g: 0, f: h(0, 0) }];
  const inOpen = new Map([[key(0,0), open[0]]]);
  const closed = new Set();
  const prev = new Map();
  while (open.length) {
    open.sort((a,b)=>a.f-b.f);
    const cur = open.shift();
    inOpen.delete(key(cur.r, cur.c));
    const ckey = key(cur.r, cur.c);
    if (cur.r === goal[0] && cur.c === goal[1]) {
      const path = [];
      let p = ckey; while (p) { const [r,c] = p.split(',').map(Number); path.push([r,c]); p = prev.get(p); }
      return path.reverse();
    }
    closed.add(ckey);
    for (const [dr, dc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      const nr = cur.r + dr, nc = cur.c + dc;
      if (nr<0||nr>=rows||nc<0||nc>=cols) continue;
      if (maze[nr][nc].isWall) continue;
      const nkey = key(nr, nc);
      if (closed.has(nkey)) continue;
      const g = cur.g + 1, f = g + h(nr, nc);
      const exist = inOpen.get(nkey);
      if (!exist || g < exist.g) {
        prev.set(nkey, ckey);
        const node = { r: nr, c: nc, g, f };
        if (!exist) { open.push(node); inOpen.set(nkey, node); } else { exist.g = g; exist.f = f; }
      }
    }
  }
  return [];
}`;

export const CodeSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Algorithm Implementations</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground max-w-3xl mx-auto">
            View reference implementations of DFS, BFS, and A* used in the visualization.
          </p>
        </div>
        <Card className="p-6 md:p-8 bg-card/70 backdrop-blur rounded-3xl border border-border/60 shadow-xl">
          <Tabs defaultValue="dfs">
            <TabsList className="mb-4">
              <TabsTrigger value="dfs">DFS</TabsTrigger>
              <TabsTrigger value="bfs">BFS</TabsTrigger>
              <TabsTrigger value="astar">A*</TabsTrigger>
            </TabsList>
            <TabsContent value="dfs">
              <pre className={codeStyle}><code>{dfsCode}</code></pre>
            </TabsContent>
            <TabsContent value="bfs">
              <pre className={codeStyle}><code>{bfsCode}</code></pre>
            </TabsContent>
            <TabsContent value="astar">
              <pre className={codeStyle}><code>{aStarCode}</code></pre>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};
