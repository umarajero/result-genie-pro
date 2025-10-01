import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, X, ChevronRight, ChevronLeft, Upload, Award, Users, FileSpreadsheet } from "lucide-react";

const demoSteps = [
  {
    id: 1,
    title: "Welcome to ResultGenie",
    description: "Transform your school's result management with automated certificate generation, parent portals, and professional result statements.",
    icon: <Award className="w-8 h-8 text-primary" />,
    content: "ResultGenie simplifies the entire process of managing student results, from data import to certificate generation.",
    avatar: { fallback: "AD", role: "Administrator" }
  },
  {
    id: 2,
    title: "Step 1: Upload Student Data",
    description: "Import your student data easily using Excel or CSV files",
    icon: <Upload className="w-8 h-8 text-secondary" />,
    content: "Simply drag and drop your Excel or CSV file containing student information, subjects, and grades. Our system automatically processes and validates the data.",
    avatar: { fallback: "TC", role: "Teacher" }
  },
  {
    id: 3,
    title: "Step 2: Generate Certificates",
    description: "Automatically create professional certificates for all students",
    icon: <Award className="w-8 h-8 text-accent" />,
    content: "With one click, generate beautifully designed certificates for all students. Customize templates with your school's branding and information.",
    avatar: { fallback: "ST", role: "Student" }
  },
  {
    id: 4,
    title: "Step 3: Parent Portal Access",
    description: "Parents can securely access their child's results and certificates",
    icon: <Users className="w-8 h-8 text-primary" />,
    content: "Send secure links to parents so they can view and download their child's results, certificates, and academic progress reports.",
    avatar: { fallback: "PR", role: "Parent" }
  },
  {
    id: 5,
    title: "Step 4: Result Statements",
    description: "Generate comprehensive result statements and reports",
    icon: <FileSpreadsheet className="w-8 h-8 text-secondary" />,
    content: "Create detailed result statements with grades, positions, and academic summaries. Export in multiple formats for official records.",
    avatar: { fallback: "PR", role: "Principal" }
  }
];

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % demoSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + demoSteps.length) % demoSteps.length);
  };

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
  };

  const currentStepData = demoSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">ResultGenie Demo</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          {!isPlaying ? (
            // Demo Introduction
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Play className="w-12 h-12 text-white ml-1" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Interactive Demo</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Take a guided tour of ResultGenie and see how easy it is to manage student results and generate certificates.
                </p>
              </div>
              <Button onClick={startDemo} size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Start Demo
              </Button>
            </div>
          ) : (
            // Demo Steps
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  Step {currentStep + 1} of {demoSteps.length}
                </Badge>
                <div className="flex-1 mx-4 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round(((currentStep + 1) / demoSteps.length) * 100)}%
                </span>
              </div>

              {/* Step Content */}
              <div className="bg-muted/30 rounded-lg p-8 text-center space-y-4">
                <div className="flex justify-center items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {currentStepData.avatar.fallback}
                    </AvatarFallback>
                  </Avatar>
                  {currentStepData.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">{currentStepData.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {currentStepData.avatar.role} View
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">{currentStepData.description}</p>
                <p className="max-w-2xl mx-auto">{currentStepData.content}</p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {demoSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                {currentStep === demoSteps.length - 1 ? (
                  <Button onClick={onClose} className="gap-2">
                    Get Started
                    <Award className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={nextStep} className="gap-2">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};