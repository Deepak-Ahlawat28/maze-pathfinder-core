import { Card } from "@/components/ui/card";
import { Network, Cpu, Code2 } from "lucide-react";

export const AbstractSection = () => {
  const icons = [
    { Icon: Network, label: "Graph Theory", color: "text-accent" },
    { Icon: Cpu, label: "Algorithm", color: "text-lime" },
    { Icon: Code2, label: "Java 17", color: "text-primary" },
  ];

  return (
    <section id="abstract" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Abstract
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {icons.map(({ Icon, label, color }) => (
            <Card 
              key={label}
              className="p-6 text-center border-border bg-card/50 backdrop-blur-sm hover:border-accent transition-smooth hover:glow-cyan"
            >
              <Icon className={`w-12 h-12 mx-auto mb-3 ${color}`} />
              <h3 className="font-semibold text-lg">{label}</h3>
            </Card>
          ))}
        </div>

        <Card className="p-8 md:p-12 border-border bg-card/50 backdrop-blur-sm">
          <p className="text-lg leading-relaxed text-muted-foreground">
            This study presents a <span className="text-accent font-semibold">comprehensive analysis</span> of solving maze puzzles using the 
            recursive backtracking algorithm, a form of <span className="text-lime font-semibold">depth-first search (DFS)</span>, 
            implemented in <span className="text-primary font-semibold">Java 17</span>. We model a maze as a 2D grid, which implicitly 
            represents a graph, and employ recursion with backtracking to find a path from an entry to an exit point. 
            The theoretical foundation involves graph modeling, DFS traversal, and core backtracking principles. 
            Our methodology details the data structures (2D arrays, visited markers, the call stack) and the code structure 
            required for implementation. We provide an interactive simulation to show the solved path and analyze the 
            algorithm's performance in terms of time and space complexity. Comparisons with breadth-first search (BFS) 
            highlight that while BFS guarantees the shortest path, DFS-based backtracking typically finds a path efficiently 
            using less memory, making it well-suited for many maze scenarios.
          </p>
        </Card>
      </div>
    </section>
  );
};
