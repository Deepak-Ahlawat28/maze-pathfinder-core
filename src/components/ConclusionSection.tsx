import { Card } from "@/components/ui/card";
import { CheckCircle, Lightbulb } from "lucide-react";

export const ConclusionSection = () => {
  const advantages = [
    "Efficient memory usage with call stack-based recursion",
    "Naturally elegant implementation for maze-solving problems",
    "Suitable for complex, large-scale maze environments",
    "Guarantees finding a solution if one exists",
  ];

  const futureWork = [
    "Optimization using A* algorithm for heuristic-based pathfinding",
    "Integration with machine learning for adaptive maze solving",
    "Parallel processing implementation for multi-threaded maze solving",
    "3D maze visualization and solving capabilities",
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Conclusion
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-semibold">Key Advantages</h3>
            </div>
            <ul className="space-y-4">
              {advantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-xl">✓</span>
                  <span className="text-muted-foreground">{advantage}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-8 h-8 text-lime" />
              <h3 className="text-2xl font-semibold">Future Work</h3>
            </div>
            <ul className="space-y-4">
              {futureWork.map((work, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-lime mt-1 text-xl">▸</span>
                  <span className="text-muted-foreground">{work}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="mt-8 p-8 border-border bg-card/50 backdrop-blur-sm">
          <p className="text-lg text-center text-muted-foreground leading-relaxed">
            This research demonstrates that <span className="text-accent font-semibold">recursive backtracking</span> provides 
            an elegant and efficient solution for maze-solving problems. By leveraging the natural properties of 
            <span className="text-lime font-semibold"> depth-first search</span> and the power of 
            <span className="text-primary font-semibold"> Java 17</span>, we have created a robust implementation 
            that balances performance with code clarity.
          </p>
        </Card>
      </div>
    </section>
  );
};
