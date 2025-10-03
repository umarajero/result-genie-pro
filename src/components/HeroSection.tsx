import { Button } from "@/components/ui/button";
import { GraduationCap, Upload, Award, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DemoModal } from "./DemoModal";
import { useState } from "react";
import HeroEducation from "../assets/hero-education.jpg"

export const HeroSection = () => {
  const { toast } = useToast();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleGetStarted = () => {
    const uploadSection = document.getElementById('upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "Let's Get Started!",
      description: "Upload your student data to begin generating certificates with ResultGenie.",
    });
  };

  const handleWatchDemo = () => {
    setIsDemoOpen(true);
    toast({
      title: "Demo Starting",
      description: "Take an interactive tour of ResultGenie features!",
    });
  };

  return (
    <section className="relative min-h-screen bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="text-white space-y-8 relative z-20">
            {/* Large ResultGenie Logo */}
            <div className="mb-6 w-full">
              <img
                src={HeroEducation}
                alt="Hero"
                className="w-screen max-w-none h-auto object-cover ml-[calc(50%_-_50vw)]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // fallback: hide image on error
                  target.style.display = 'none';
                }}
              />
            </div>
            
            <p className="text-2xl lg:text-3xl font-medium leading-relaxed max-w-2xl text-white">
              Transform your school's result management with automated certificate generation, 
              parent portals, and professional result statements.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
              <div className="flex items-center gap-3 text-white/80">
                <Upload className="w-6 h-6 text-secondary" />
                <span className="font-medium">Excel/CSV Import</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Award className="w-6 h-6 text-secondary" />
                <span className="font-medium">Auto Certificates</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Users className="w-6 h-6 text-secondary" />
                <span className="font-medium">Parent Portal</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="group" 
                onClick={handleGetStarted}
                aria-label="Start using Graderly for free"
              >
                Get Started Free
                <GraduationCap className="w-5 h-5 ml-2 group-hover:animate-float" />
              </Button>
              <Button 
                variant="academic" 
                size="lg"
                className="text-white"
                onClick={handleWatchDemo}
                aria-label="Watch demonstration video"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-academic">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop&crop=center"
                alt="Modern Education Technology"
                className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-certificate animate-float">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-success animate-float animation-delay-1000">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">5min</div>
                <div className="text-sm text-muted-foreground">Setup Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-secondary/20 rounded-full animate-glow" />
      <div className="absolute bottom-1/3 left-10 w-16 h-16 bg-accent/20 rounded-full animate-glow animation-delay-2000" />
      
      {/* Demo Modal */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  );
};