import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { generateMaze, solveMazeWithSteps, type MazeGrid, type Algorithm } from "@/utils/mazeGenerator";

export const SimulationSection = () => {
  const MAZE_SIZE = 15; // Odd number for better maze generation
  const [maze, setMaze] = useState<MazeGrid>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pathIndex, setPathIndex] = useState(0);
  const [solvedPath, setSolvedPath] = useState<{ row: number; col: number }[]>([]);
  const [algorithm, setAlgorithm] = useState<Algorithm>("DFS");
  const [visitedIndex, setVisitedIndex] = useState(0);
  const [visitedOrder, setVisitedOrder] = useState<{ row: number; col: number }[]>([]);

  // Generate initial maze
  useEffect(() => {
    generateNewMaze();
  }, []);

  const generateNewMaze = () => {
    const newMaze = generateMaze(MAZE_SIZE, MAZE_SIZE);
    setMaze(newMaze);
    setPathIndex(0);
    setSolvedPath([]);
    setIsPlaying(false);
    setVisitedIndex(0);
    setVisitedOrder([]);
  };

  const handleSimulation = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    const { visitedOrder, path } = solveMazeWithSteps(maze, algorithm);
    setVisitedOrder(visitedOrder);
    setSolvedPath(path.map(cell => ({ row: cell.row, col: cell.col })));

    // Phase 1: animate exploration
    let vIndex = 0;
    const visitInterval = setInterval(() => {
      vIndex++;
      setVisitedIndex(vIndex);
      if (vIndex >= visitedOrder.length) {
        clearInterval(visitInterval);
        // Phase 2: animate final path
        let pIndex = 0;
        const pathInterval = setInterval(() => {
          pIndex++;
          setPathIndex(pIndex);
          if (pIndex >= path.length) {
            clearInterval(pathInterval);
            setTimeout(() => setIsPlaying(false), 500);
          }
        }, 40);
      }
    }, 12);
  };

  const getCellStyle = (row: number, col: number) => {
    const cell = maze[row]?.[col];
    if (!cell) return "bg-card border border-border";

    // Check if cell is in the animated path
    const isInPath = solvedPath.slice(0, pathIndex).some(
      p => p.row === row && p.col === col
    );
    // Check if cell was visited during exploration
    const isVisited = visitedOrder.slice(0, visitedIndex).some(
      v => v.row === row && v.col === col
    );

    if (cell.isStart) return "bg-lime rounded-full shadow-md shadow-lime/40 ring-2 ring-lime/40";
    if (cell.isEnd) return "bg-accent rounded-full shadow-md shadow-accent/40 ring-2 ring-accent/40";
    if (isInPath) return "bg-accent/90 animate-glow shadow-sm";
    if (isVisited) return "bg-primary/40 border border-primary/40";
    if (cell.isWall) return "bg-muted/50";
    return "bg-card/60 border border-border/50 hover:shadow-sm transition-smooth";
  };

  return (
    <section id="simulation" className="py-24 px-6 relative animate-fade-in">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Interactive Simulation
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare DFS, BFS, and A* as they navigate a dynamically generated maze
          </p>
        </div>

        <Card className="p-8 md:p-12 border-border/60 bg-card/70 backdrop-blur-md shadow-xl rounded-3xl">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex gap-2 mb-2 md:mb-0">
              <Button
                variant={algorithm === "DFS" ? "default" : "outline"}
                className={algorithm === "DFS" ? "bg-accent text-accent-foreground" : ""}
                onClick={() => setAlgorithm("DFS")}
                disabled={isPlaying}
              >
                DFS
              </Button>
              <Button
                variant={algorithm === "BFS" ? "default" : "outline"}
                className={algorithm === "BFS" ? "bg-lime text-lime-foreground" : ""}
                onClick={() => setAlgorithm("BFS")}
                disabled={isPlaying}
              >
                BFS
              </Button>
              <Button
                variant={algorithm === "ASTAR" ? "default" : "outline"}
                className={algorithm === "ASTAR" ? "bg-primary text-primary-foreground" : ""}
                onClick={() => setAlgorithm("ASTAR")}
                disabled={isPlaying}
              >
                A*
              </Button>
            </div>
            <Button
              size="lg"
              onClick={handleSimulation}
              disabled={isPlaying || maze.length === 0}
              className="bg-lime hover:bg-lime/90 text-lime-foreground font-semibold px-8 glow-lime transition-smooth hover-pop"
            >
              <Play className="mr-2" />
              {isPlaying ? "Solving..." : "Run Simulation"}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={generateNewMaze}
              disabled={isPlaying}
              className="border-accent text-accent hover:bg-accent/10 font-semibold px-8 transition-smooth hover-pop"
            >
              <RefreshCw className="mr-2" />
              Generate New Maze
            </Button>
          </div>

          {/* Maze Grid Visualization */}
          <div className="relative aspect-square max-w-3xl mx-auto bg-white/70 dark:bg-background/80 rounded-3xl p-5 border border-border/60 shadow-2xl frosted">
            <div 
              className="grid gap-1.5 h-full w-full"
              style={{ gridTemplateColumns: `repeat(${MAZE_SIZE}, 1fr)` }}
            >
              {maze.map((row, rowIndex) =>
                row.map((_, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`rounded-md md:rounded-lg transition-all duration-300 ${getCellStyle(rowIndex, colIndex)}`}
                  />
                ))
              )}
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <div className="text-3xl font-bold text-accent mb-1">O(V+E)</div>
              <div className="text-sm text-muted-foreground">Time Complexity</div>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <div className="text-3xl font-bold text-lime mb-1">O(V)</div>
              <div className="text-sm text-muted-foreground">Space Complexity</div>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <div className="text-3xl font-bold text-primary mb-1">{MAZE_SIZE}×{MAZE_SIZE}</div>
              <div className="text-sm text-muted-foreground">Grid Size</div>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <div className="text-3xl font-bold text-accent mb-1">{solvedPath.length}</div>
              <div className="text-sm text-muted-foreground">Path Length ({algorithm})</div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-lime rounded-full shadow-lg shadow-lime/50" />
              <span className="text-muted-foreground">Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-accent rounded-full shadow-lg shadow-accent/50" />
              <span className="text-muted-foreground">End</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-muted/50 rounded" />
              <span className="text-muted-foreground">Wall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-accent rounded animate-glow" />
              <span className="text-muted-foreground">Solution Path</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
