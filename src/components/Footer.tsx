import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border/60 bg-white/60 dark:bg-secondary/40 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl">
        {/* Made By Section */}
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-bold mb-8 text-gradient">Made By</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-card/70 backdrop-blur-md border border-accent/30 hover:border-accent transition-smooth hover:glow-cyan shadow-lg">
              <h4 className="text-2xl font-semibold text-accent mb-2">Deepak Ahlawat</h4>
              <p className="text-lg text-muted-foreground font-mono">24BDS0379</p>
            </div>
            <div className="p-6 rounded-2xl bg-card/70 backdrop-blur-md border border-lime/30 hover:border-lime transition-smooth hover:glow-lime shadow-lg">
              <h4 className="text-2xl font-semibold text-lime mb-2">Ashish Choudhary</h4>
              <p className="text-lg text-muted-foreground font-mono">24BDS0376</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8 pt-8 border-t border-border/60">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-accent">Project Team</h3>
            <p className="text-muted-foreground">Computer Science Department</p>
            <p className="text-muted-foreground">Research Project 2024</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-lime">Institution</h3>
            <p className="text-muted-foreground font-semibold">VIT Vellore</p>
            <p className="text-muted-foreground">Vellore Institute of Technology</p>
            <p className="text-muted-foreground">Tamil Nadu, India</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Connect</h3>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="icon"
                className="border-border/60 hover:border-accent hover:bg-accent/10 transition-smooth glass pill"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="border-border/60 hover:border-lime hover:bg-lime/10 transition-smooth glass pill"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/60 text-center text-muted-foreground">
          <p>© 2024 VIT Vellore. Maze Solving Research Project.</p>
          <p className="mt-2 text-sm">
            Implemented with <span className="text-accent">Java 17</span> • 
            Documented with <span className="text-lime">React</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
