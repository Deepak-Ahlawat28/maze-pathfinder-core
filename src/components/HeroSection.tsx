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
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 dark:from-background/90 dark:to-background/60 backdrop-blur-xl" />
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
        <div className="max-w-6xl mx-auto space-y-10">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
            <span className="text-gradient block mb-4">Maze Solving Using</span>
            <span className="text-foreground block mb-4">Recursive Backtracking</span>
            <span className="text-muted-foreground text-4xl md:text-6xl block">in Java 17</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A comprehensive study and implementation of maze solving through 
            <span className="text-accent font-semibold"> Depth-First Search</span> and 
            <span className="text-lime font-semibold"> Backtracking</span>
          </p>

          <div className="flex gap-6 justify-center items-center pt-12">
            <Button 
              size="lg" 
              onClick={scrollToNext}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-7 text-xl transition-smooth glow-cyan shadow-xl hover-pop"
            >
              Explore Project
              <ArrowDown className="ml-3 h-6 w-6" />
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
