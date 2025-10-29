import { Card } from "@/components/ui/card";
import { GitBranch, Layers, RotateCcw, Code2 } from "lucide-react";

export const MethodologySection = () => {
  const steps = [
    {
      icon: Layers,
      title: "Graph Modeling of Maze",
      description: "Model the maze as a 2D grid where each cell is a node, and adjacent walkable cells form edges.",
      color: "text-accent",
    },
    {
      icon: GitBranch,
      title: "DFS and Recursion Explained",
      description: "Use depth-first search with recursion to explore paths, visiting nodes and marking them as visited.",
      color: "text-lime",
    },
    {
      icon: RotateCcw,
      title: "Backtracking Principle",
      description: "When a dead-end is reached, backtrack to explore alternative paths until the exit is found.",
      color: "text-primary",
    },
  ];

  const codeSnippet = `public boolean solveMaze(int[][] maze, int x, int y, boolean[][] visited) {
    // Base case: reached the exit
    if (x == maze.length - 1 && y == maze[0].length - 1) {
        return true;
    }
    
    // Mark current cell as visited
    visited[x][y] = true;
    
    // Explore all 4 directions
    int[][] directions = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    
    for (int[] dir : directions) {
        int newX = x + dir[0];
        int newY = y + dir[1];
        
        if (isValid(maze, newX, newY, visited)) {
            if (solveMaze(maze, newX, newY, visited)) {
                return true; // Path found
            }
        }
    }
    
    // Backtrack: unmark and return false
    visited[x][y] = false;
    return false;
}`;

  return (
    <section className="py-32 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Methodology
          </h2>
          <div className="w-32 h-1.5 bg-gradient-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map(({ icon: Icon, title, description, color }) => (
            <Card 
              key={title}
              className="p-8 border-border bg-card/50 backdrop-blur-sm hover:border-accent transition-smooth group shadow-lg"
            >
              <Icon className={`w-14 h-14 mb-6 ${color} group-hover:scale-110 transition-smooth`} />
              <h3 className="font-semibold text-2xl mb-4">{title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-10 border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
          <h3 className="text-3xl font-semibold mb-8 flex items-center gap-3">
            <Code2 className="text-accent w-8 h-8" />
            Implementation Logic
          </h3>
          <div className="bg-background/80 rounded-xl p-8 overflow-x-auto border border-accent/20">
            <pre className="text-sm md:text-base leading-relaxed">
              <code className="text-accent">{codeSnippet}</code>
            </pre>
          </div>
        </Card>
      </div>
    </section>
  );
};
