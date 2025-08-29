import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, School, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStudentData } from "@/hooks/useStudentData";

export const SchoolInfoForm = () => {
  const { schoolInfo, setSchoolInfo } = useStudentData();
  const { toast } = useToast();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    schoolInfo?.logo || null
  );

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setLogoFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setLogoPreview(result);
          // Update school info with the logo
          setSchoolInfo({
            ...schoolInfo,
            name: schoolInfo?.name || "ElevateHer Innovation Space Limited",
            address: schoolInfo?.address || "",
            session: schoolInfo?.session || new Date().getFullYear().toString(),
            principalName: schoolInfo?.principalName || "",
            logo: result
          });
        };
        reader.readAsDataURL(file);
        
        toast({
          title: "Logo uploaded",
          description: "School logo has been updated successfully.",
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const handleSchoolInfoChange = (field: string, value: string) => {
    setSchoolInfo({
      ...schoolInfo,
      name: schoolInfo?.name || "ElevateHer Innovation Space Limited",
      address: schoolInfo?.address || "",
      session: schoolInfo?.session || new Date().getFullYear().toString(),
      principalName: schoolInfo?.principalName || "",
      logo: schoolInfo?.logo || "/lovable-uploads/7cdd4f04-6759-4df0-98ca-039c85f03aa2.png",
      [field]: value
    });
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-primary/20 bg-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <School className="w-6 h-6 text-primary" />
                School Information
              </CardTitle>
              <CardDescription>
                Enter your institution details for the certificates
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* School Name */}
              <div className="space-y-2">
                <Label htmlFor="school-name">School/Institution Name *</Label>
                <Input
                  id="school-name"
                  type="text"
                  placeholder="Enter your school or institution name"
                  value={schoolInfo?.name || ""}
                  onChange={(e) => handleSchoolInfoChange('name', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* School Address */}
              <div className="space-y-2">
                <Label htmlFor="school-address">Address</Label>
                <Textarea
                  id="school-address"
                  placeholder="Enter your institution address"
                  value={schoolInfo?.address || ""}
                  onChange={(e) => handleSchoolInfoChange('address', e.target.value)}
                  className="w-full resize-none"
                  rows={3}
                />
              </div>

              {/* Academic Session */}
              <div className="space-y-2">
                <Label htmlFor="academic-session">Academic Session</Label>
                <Input
                  id="academic-session"
                  type="text"
                  placeholder="e.g., 2024/2025"
                  value={schoolInfo?.session || ""}
                  onChange={(e) => handleSchoolInfoChange('session', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Principal Name */}
              <div className="space-y-2">
                <Label htmlFor="principal-name">Principal/Head Name</Label>
                <Input
                  id="principal-name"
                  type="text"
                  placeholder="Enter the principal or head's name"
                  value={schoolInfo?.principalName || ""}
                  onChange={(e) => handleSchoolInfoChange('principalName', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Logo Upload */}
              <div className="space-y-2">
                <Label htmlFor="school-logo">School Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor="logo-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-4 text-center transition-colors">
                        <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload logo
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Supports JPG, PNG, SVG
                        </p>
                      </div>
                    </Label>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                  
                  {/* Logo Preview */}
                  {logoPreview && (
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 border rounded-lg overflow-hidden bg-muted">
                        <img
                          src={logoPreview}
                          alt="School logo preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status indicator */}
              {schoolInfo?.name && (
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Check className="w-4 h-4" />
                  School information updated
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};