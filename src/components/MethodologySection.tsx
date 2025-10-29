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
    <section className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Methodology
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map(({ icon: Icon, title, description, color }) => (
            <Card 
              key={title}
              className="p-6 border-border bg-card/50 backdrop-blur-sm hover:border-accent transition-smooth group"
            >
              <Icon className={`w-10 h-10 mb-4 ${color} group-hover:scale-110 transition-smooth`} />
              <h3 className="font-semibold text-xl mb-3">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 border-border bg-card/50 backdrop-blur-sm overflow-hidden">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Code2 className="text-accent" />
            Implementation Logic
          </h3>
          <div className="bg-background/80 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm md:text-base">
              <code className="text-accent">{codeSnippet}</code>
            </pre>
          </div>
        </Card>
      </div>
    </section>
  );
};
