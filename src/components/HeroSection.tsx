import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroMaze from "@/assets/hero-maze.jpg";

export const HeroSection = () => {
  const scrollToNext = () => {
    const abstractSection = document.getElementById("abstract");
    abstractSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroMaze})` }}
      >
        <div className="absolute inset-0 bg-background/90" />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--accent)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gradient">Maze Solving Using</span>
            <br />
            <span className="text-foreground">Recursive Backtracking</span>
            <br />
            <span className="text-muted-foreground text-3xl md:text-5xl">in Java 17</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive study and implementation of maze solving through 
            Depth-First Search and Backtracking.
          </p>

          <div className="flex gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              onClick={scrollToNext}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg transition-smooth glow-cyan"
            >
              Explore Project
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-glow" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-lime rounded-full animate-glow" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent rounded-full animate-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-lime rounded-full animate-glow" style={{ animationDelay: '1.5s' }} />
      </div>
    </section>
  );
};
