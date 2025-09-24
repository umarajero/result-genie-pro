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

  const handleNavClick = (sectionId: string, sectionName: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: `Navigating to ${sectionName}`,
        description: `Scrolling to the ${sectionName} section.`,
      });
    }
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
            <button 
              onClick={() => handleNavClick('features', 'Features')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick('upload', 'Upload')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Upload
            </button>
            <button 
              onClick={() => handleNavClick('pricing', 'Pricing')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavClick('parent-portal', 'Contact')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
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
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  handleNavClick('features', 'Features');
                  setIsMenuOpen(false);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => {
                  handleNavClick('upload', 'Upload');
                  setIsMenuOpen(false);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Upload
              </button>
              <button 
                onClick={() => {
                  handleNavClick('pricing', 'Pricing');
                  setIsMenuOpen(false);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => {
                  handleNavClick('parent-portal', 'Contact');
                  setIsMenuOpen(false);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </button>
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