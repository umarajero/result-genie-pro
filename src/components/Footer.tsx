import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSocialClick = (platform: string) => {
    toast({
      title: `Opening ${platform}`,
      description: `Redirecting to our ${platform} page...`,
    });
  };

  const handleSubscribe = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Subscribed Successfully!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  const handleLinkClick = (linkName: string) => {
    toast({
      title: `Opening ${linkName}`,
      description: `Redirecting to ${linkName} page...`,
    });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Result Genie Pro</h3>
              </div>
            </div>
            <p className="text-muted-foreground">
              Empowering schools with modern result management, automated certificate generation, 
              and seamless parent communication.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick("Facebook")}
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick("Twitter")}
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick("LinkedIn")}
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Product</h4>
            <div className="space-y-2">
              <button 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                onClick={() => handleLinkClick("Features")}
              >
                Features
              </button>
              <button 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                onClick={() => handleLinkClick("Pricing")}
              >
                Pricing
              </button>
              <button 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                onClick={() => handleLinkClick("Templates")}
              >
                Templates
              </button>
              <button 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                onClick={() => handleLinkClick("API Docs")}
              >
                API Docs
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Support</h4>
            <div className="space-y-2">
              <button 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                onClick={() => handleLinkClick("Help Center")}
              >
                Help Center
              </button>
              <button 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                onClick={() => handleLinkClick("Contact Us")}
              >
                Contact Us
              </button>
              <button 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                onClick={() => handleLinkClick("Video Tutorials")}
              >
                Video Tutorials
              </button>
              <button 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                onClick={() => handleLinkClick("System Status")}
              >
                System Status
              </button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Stay Updated</h4>
            <p className="text-muted-foreground">
              Get the latest updates on new features and education insights.
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                aria-label="Email address for newsletter subscription"
              />
              <Button 
                variant="default" 
                className="w-full"
                onClick={handleSubscribe}
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">support@resultgeniepro.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Education District, Tech City</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Result Genie Pro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleLinkClick("Privacy Policy")}
            >
              Privacy Policy
            </button>
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleLinkClick("Terms of Service")}
            >
              Terms of Service
            </button>
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleLinkClick("Cookie Policy")}
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};