import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { generateMaze, solveMaze, type MazeGrid } from "@/utils/mazeGenerator";

export const SimulationSection = () => {
  const MAZE_SIZE = 15; // Odd number for better maze generation
  const [maze, setMaze] = useState<MazeGrid>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pathIndex, setPathIndex] = useState(0);
  const [solvedPath, setSolvedPath] = useState<{ row: number; col: number }[]>([]);

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
  };

  const handleSimulation = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    const path = solveMaze(maze);
    setSolvedPath(path.map(cell => ({ row: cell.row, col: cell.col })));
    
    // Animate the path
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setPathIndex(index);
      
      if (index >= path.length) {
        clearInterval(interval);
        setTimeout(() => setIsPlaying(false), 500);
      }
    }, 50);
  };

  const getCellStyle = (row: number, col: number) => {
    const cell = maze[row]?.[col];
    if (!cell) return "bg-card border border-border";

    // Check if cell is in the animated path
    const isInPath = solvedPath.slice(0, pathIndex).some(
      p => p.row === row && p.col === col
    );

    if (cell.isStart) return "bg-lime rounded-full shadow-lg shadow-lime/50";
    if (cell.isEnd) return "bg-accent rounded-full shadow-lg shadow-accent/50";
    if (isInPath) return "bg-accent animate-glow";
    if (cell.isWall) return "bg-muted/50";
    return "bg-card/30 border border-border/30";
  };

  return (
    <section id="simulation" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Interactive Simulation
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch the recursive backtracking algorithm navigate through a dynamically generated maze
          </p>
        </div>

        <Card className="p-6 md:p-10 border-border bg-card/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              onClick={handleSimulation}
              disabled={isPlaying || maze.length === 0}
              className="bg-lime hover:bg-lime/90 text-lime-foreground font-semibold px-8 glow-lime transition-smooth"
            >
              <Play className="mr-2" />
              {isPlaying ? "Solving..." : "Run Simulation"}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={generateNewMaze}
              disabled={isPlaying}
              className="border-accent text-accent hover:bg-accent/10 font-semibold px-8 transition-smooth"
            >
              <RefreshCw className="mr-2" />
              Generate New Maze
            </Button>
          </div>

          {/* Maze Grid Visualization */}
          <div className="relative aspect-square max-w-3xl mx-auto bg-background/80 rounded-xl p-4 border-2 border-accent/30 shadow-2xl">
            <div 
              className="grid gap-1 h-full w-full"
              style={{ gridTemplateColumns: `repeat(${MAZE_SIZE}, 1fr)` }}
            >
              {maze.map((row, rowIndex) =>
                row.map((_, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`rounded transition-all duration-300 ${getCellStyle(rowIndex, colIndex)}`}
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
              <div className="text-sm text-muted-foreground">Path Length</div>
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
