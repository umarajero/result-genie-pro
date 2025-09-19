import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = () => {
    navigate('/');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  const handleGetStarted = () => {
    const uploadSection = document.getElementById('upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "Getting Started",
      description: "Scroll down to upload your first file with ResultGenie!",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Navigation spacer */}
          <div className="flex items-center">
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#upload" className="text-muted-foreground hover:text-foreground transition-colors">
              Upload
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={user ? handleSignOut : handleSignIn}
              aria-label={user ? "Sign out of your account" : "Sign in to your account"}
            >
              {user ? "Sign Out" : "Sign In"}
            </Button>
            {user && (
              <Button 
                variant="default" 
                onClick={handleGetStarted}
                aria-label="Get started with Graderly"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="/src/assets/ChatGPT Image Sep 18, 2025, 04_58_51 PM.png" 
            alt="ResultGenie Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a 
                href="#features" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#upload" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Upload
              </a>
              <a 
                href="#pricing" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#contact" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  onClick={user ? handleSignOut : handleSignIn}
                  aria-label={user ? "Sign out of your account" : "Sign in to your account"}
                >
                  {user ? "Sign Out" : "Sign In"}
                </Button>
                {user && (
                  <Button 
                    variant="default" 
                    onClick={handleGetStarted}
                    aria-label="Get started with Graderly"
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};