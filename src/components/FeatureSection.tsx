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
import { CertificateTemplate } from "./CertificateTemplate";
import { useState } from "react";

export const FeatureSection = () => {
  const { toast } = useToast();
  const [showCertificate, setShowCertificate] = useState(false);
  const [showParentPortal, setShowParentPortal] = useState(false);

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
    setShowCertificate(true);
    toast({
      title: "Certificate Generated!",
      description: "Sample certificate created with demo student data.",
    });
  };

  const handleParentPortal = () => {
    setShowParentPortal(true);
    toast({
      title: "Parent Portal Activated!",
      description: "Demo portal showing secure access for parents.",
    });
  };

  // Sample data for certificate
  const sampleCertificateData = {
    studentName: "John Smith",
    className: "Grade 10A",
    session: "2023/2024",
    term: "First Term",
    position: "3rd",
    totalStudents: 45,
    schoolName: "Excellence Academy",
    schoolAddress: "123 Education Street, Learning City",
    schoolContact: "Tel: +234-801-234-5678 | Email: info@excellenceacademy.edu",
    subjects: [
      { name: "Mathematics", score: 85, grade: "A" },
      { name: "English Language", score: 78, grade: "B" },
      { name: "Physics", score: 92, grade: "A" },
      { name: "Chemistry", score: 88, grade: "A" },
      { name: "Biology", score: 76, grade: "B" },
      { name: "Economics", score: 82, grade: "A" },
      { name: "Government", score: 74, grade: "B" },
      { name: "Literature", score: 79, grade: "B" }
    ],
    dateIssued: new Date().toLocaleDateString()
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
      description: "Automatically process grades, calculate averages, and generate reports",
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
              Why Teachers Love AjeroCompute
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
                aria-label="Start your free trial of AjeroCompute"
              >
                Start Your Free Trial
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

        {/* Certificate Display Modal */}
        {showCertificate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground">Generated Certificate & Statement of Result</h3>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCertificate(false)}
                    aria-label="Close certificate view"
                  >
                    Close
                  </Button>
                </div>
                <CertificateTemplate {...sampleCertificateData} />
                <div className="mt-6 flex justify-center gap-4">
                  <Button variant="default">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline">
                    Print Certificate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Parent Portal Display */}
        {showParentPortal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground">Parent Portal - Secure Access</h3>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowParentPortal(false)}
                    aria-label="Close parent portal"
                  >
                    Close
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Portal Header */}
                  <div className="bg-gradient-primary p-6 rounded-lg text-white text-center">
                    <h4 className="text-xl font-bold mb-2">Welcome to Excellence Academy Parent Portal</h4>
                    <p className="text-white/90">Secure access to your child's academic results</p>
                  </div>
                  
                  {/* Student Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Student Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Student Name</p>
                          <p className="font-semibold">{sampleCertificateData.studentName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Class</p>
                          <p className="font-semibold">{sampleCertificateData.className}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Session</p>
                          <p className="font-semibold">{sampleCertificateData.session}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Term</p>
                          <p className="font-semibold">{sampleCertificateData.term}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Quick Stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-success text-white">
                      <CardContent className="p-4 text-center">
                        <Award className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{sampleCertificateData.position}</div>
                        <div className="text-sm text-white/90">Class Position</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-primary text-white">
                      <CardContent className="p-4 text-center">
                        <FileSpreadsheet className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{Math.round(sampleCertificateData.subjects.reduce((sum, s) => sum + s.score, 0) / sampleCertificateData.subjects.length)}%</div>
                        <div className="text-sm text-white/90">Average Score</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-accent text-white">
                      <CardContent className="p-4 text-center">
                        <Users className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{sampleCertificateData.totalStudents}</div>
                        <div className="text-sm text-white/90">Total Students</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 pt-4">
                    <Button onClick={() => {setShowParentPortal(false); setShowCertificate(true);}}>
                      <Award className="w-4 h-4 mr-2" />
                      View Full Certificate
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Results
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};