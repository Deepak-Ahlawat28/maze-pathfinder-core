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
    <section className="py-32 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Conclusion
          </h2>
          <div className="w-32 h-1.5 bg-gradient-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <Card className="p-10 border-border bg-card/50 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <CheckCircle className="w-10 h-10 text-accent" />
              <h3 className="text-3xl font-semibold">Key Advantages</h3>
            </div>
            <ul className="space-y-5">
              {advantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="text-accent mt-1 text-2xl">✓</span>
                  <span className="text-muted-foreground text-lg">{advantage}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-10 border-border bg-card/50 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <Lightbulb className="w-10 h-10 text-lime" />
              <h3 className="text-3xl font-semibold">Future Work</h3>
            </div>
            <ul className="space-y-5">
              {futureWork.map((work, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="text-lime mt-1 text-2xl">▸</span>
                  <span className="text-muted-foreground text-lg">{work}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="mt-12 p-12 border-border bg-card/50 backdrop-blur-sm shadow-2xl">
          <p className="text-xl text-center text-muted-foreground leading-relaxed">
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
