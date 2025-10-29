import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const PerformanceSection = () => {
  const comparisonData = [
    {
      metric: "Time Complexity",
      dfs: "O(V + E)",
      bfs: "O(V + E)",
    },
    {
      metric: "Space Complexity",
      dfs: "O(V)",
      bfs: "O(V)",
    },
    {
      metric: "Memory Efficiency",
      dfs: "Lower (call stack)",
      bfs: "Higher (queue)",
    },
    {
      metric: "Path Type",
      dfs: "Any valid path",
      bfs: "Shortest path",
    },
    {
      metric: "Completeness",
      dfs: "Yes (with visited)",
      bfs: "Yes",
    },
  ];

  return (
    <section className="py-32 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Performance Analysis
          </h2>
          <div className="w-32 h-1.5 bg-gradient-accent mx-auto rounded-full" />
        </div>

        <Card className="p-10 border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
          <h3 className="text-3xl font-semibold mb-10 text-center">
            DFS Backtracking vs BFS Comparison
          </h3>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-accent font-semibold text-base">Metric</TableHead>
                  <TableHead className="text-accent font-semibold text-base">DFS (Backtracking)</TableHead>
                  <TableHead className="text-lime font-semibold text-base">BFS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row) => (
                  <TableRow key={row.metric} className="border-border hover:bg-muted/30 transition-smooth">
                    <TableCell className="font-medium">{row.metric}</TableCell>
                    <TableCell className="text-muted-foreground">{row.dfs}</TableCell>
                    <TableCell className="text-muted-foreground">{row.bfs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-8 p-6 bg-background/50 rounded-lg border border-border">
            <h4 className="text-xl font-semibold mb-4 text-accent">Key Findings</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">▸</span>
                <span>DFS with backtracking uses less memory than BFS, making it ideal for large mazes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">▸</span>
                <span>BFS guarantees the shortest path but requires more memory for queue operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">▸</span>
                <span>Both algorithms have the same time complexity, but DFS is often faster in practice</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
};
