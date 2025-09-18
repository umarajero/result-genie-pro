import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload, 
  FileSpreadsheet, 
  Award, 
  Users, 
  Download, 
  Shield,
  Zap,
  Clock,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStudentData } from "@/hooks/useStudentData";

export const FeatureSection = () => {
  const { toast } = useToast();
  const { students } = useStudentData();

  const handleStartTrial = () => {
    const uploadSection = document.getElementById('upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "Free Trial Started!",
      description: "Upload your first file to begin your free trial.",
    });
  };

  const handleSmartImport = () => {
    const uploadSection = document.getElementById('upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "Smart File Import Ready!",
      description: "Upload your Excel or CSV file to get started.",
    });
  };

  const handleResultProcessing = () => {
    toast({
      title: "Result Processing Available!",
      description: "Upload your student data first to enable automated processing.",
    });
  };

  const handleCertificateGeneration = () => {
    toast({
      title: "Upload Student Data First",
      description: "Please upload your Excel/CSV file with student data to generate certificates.",
      variant: "destructive"
    });
  };

  const handleParentPortal = () => {
    if (students.length === 0) {
      toast({
        title: "Upload Student Data First", 
        description: "Please upload your student data to enable the parent portal feature.",
        variant: "destructive"
      });
    } else {
      // Navigate to parent portal
      window.location.href = '#parent-portal';
      const portalSection = document.getElementById('parent-portal');
      if (portalSection) {
        portalSection.scrollIntoView({ behavior: 'smooth' });
      }
      toast({
        title: "Parent Portal Opened",
        description: "Parents can now access student results and notifications.",
      });
    }
  };

  const features = [
    {
      icon: Upload,
      title: "Smart File Import",
      description: "Upload Excel/CSV files with student data and results instantly",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: FileSpreadsheet,
      title: "Result Processing",
      description: "Automatically process grades, calculate averages, and generate reports. ID/identifier columns are automatically excluded from all calculations.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Award,
      title: "Certificate Generation",
      description: "Create beautiful, personalized certificates for every student",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Users,
      title: "Parent Portal",
      description: "Secure links for parents to view and download their child's results",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "Export results as PDF, print-ready certificates, or digital reports",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level security ensures student data remains protected",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  const benefits = [
    "Save 90% of time on result preparation",
    "Professional certificate design templates",
    "Automated parent notification system",
    "Mobile-friendly parent access portal",
    "Bulk processing for entire classes",
    "Customizable school branding"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need for
            <span className="block text-primary">Modern Result Management</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From Excel import to parent portals, streamline your entire result workflow 
            with our comprehensive education technology solution.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const getClickHandler = () => {
              if (feature.title === "Smart File Import") return handleSmartImport;
              if (feature.title === "Result Processing") return handleResultProcessing;
              if (feature.title === "Certificate Generation") return handleCertificateGeneration;
              if (feature.title === "Parent Portal") return handleParentPortal;
              return undefined;
            };

            return (
              <Card 
                key={index} 
                className={`group hover:shadow-academic transition-all duration-300 border-0 ${
                  getClickHandler() ? 'cursor-pointer hover:scale-105' : ''
                }`}
                onClick={getClickHandler()}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  {getClickHandler() && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 w-full"
                      aria-label={`Access ${feature.title}`}
                    >
                      Get Started
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Why Teachers Love ResultGenie
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-muted-foreground text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button 
                variant="success" 
                size="lg"
                onClick={handleStartTrial}
                aria-label="Start your free trial of ResultGenie"
              >
                Start Your Free Trial with ResultGenie
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-primary text-white border-0">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-white/80" />
                <div className="text-3xl font-bold mb-2">5 min</div>
                <div className="text-white/80">Average Setup</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-achievement border-0">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-secondary-foreground/80" />
                <div className="text-3xl font-bold mb-2 text-secondary-foreground">1000+</div>
                <div className="text-secondary-foreground/80">Schools Trust Us</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-success text-white border-0">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 mx-auto mb-3 text-white/80" />
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-white/80">Uptime</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-2 text-foreground">100%</div>
                <div className="text-muted-foreground">Secure</div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
};