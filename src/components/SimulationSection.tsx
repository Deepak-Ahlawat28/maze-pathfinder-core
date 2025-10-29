import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";

export const SimulationSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSimulation = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Interactive Simulation
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <Card className="p-8 md:p-12 border-border bg-card/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <p className="text-xl text-muted-foreground mb-6">
              Visualize the pathfinding process in real-time
            </p>
            <Button
              size="lg"
              onClick={handleSimulation}
              disabled={isPlaying}
              className="bg-lime hover:bg-lime/90 text-lime-foreground font-semibold px-8 glow-lime transition-smooth"
            >
              <Play className="mr-2" />
              {isPlaying ? "Running Simulation..." : "Run Simulation"}
            </Button>
          </div>

          {/* Maze Grid Visualization */}
          <div className="relative aspect-square max-w-2xl mx-auto bg-background/50 rounded-lg p-4 border-2 border-border">
            <div className="grid grid-cols-8 gap-1 h-full">
              {Array.from({ length: 64 }).map((_, i) => {
                const isPath = isPlaying && (i === 0 || i === 63 || i % 9 === 0);
                const isWall = !isPlaying && (i === 10 || i === 18 || i === 26 || i === 34 || i === 42 || i === 50);
                
                return (
                  <div
                    key={i}
                    className={`rounded transition-smooth ${
                      isPath 
                        ? 'bg-accent animate-glow' 
                        : isWall 
                        ? 'bg-muted' 
                        : 'bg-card border border-border'
                    }`}
                  />
                );
              })}
            </div>
            
            {/* Start and End markers */}
            <div className="absolute top-6 left-6 w-8 h-8 bg-lime rounded-full flex items-center justify-center text-xs font-bold">
              S
            </div>
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs font-bold">
              E
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-accent">O(V+E)</div>
              <div className="text-sm text-muted-foreground mt-1">Time Complexity</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-lime">O(V)</div>
              <div className="text-sm text-muted-foreground mt-1">Space Complexity</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">DFS</div>
              <div className="text-sm text-muted-foreground mt-1">Algorithm Type</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
