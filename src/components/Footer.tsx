import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-secondary/50 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
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
                className="border-border hover:border-accent hover:bg-accent/10 transition-smooth"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="border-border hover:border-lime hover:bg-lime/10 transition-smooth"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2024 VIT Vellore. Maze Solving Research Project.</p>
          <p className="mt-2 text-sm">
            Implemented with <span className="text-accent">Java 17</span> • 
            Documented with <span className="text-lime">React</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
