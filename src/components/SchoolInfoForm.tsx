import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, School, Check, Link, Image, Users, FileText, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStudentData } from "@/hooks/useStudentData";

export const SchoolInfoForm = () => {
  const { schoolInfo, setSchoolInfo } = useStudentData();
  const { toast } = useToast();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>("");
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
          updateSchoolInfoLogo(result);
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

  const handleLogoUrl = () => {
    if (logoUrl.trim()) {
      // Basic URL validation
      try {
        new URL(logoUrl);
        setLogoPreview(logoUrl);
        updateSchoolInfoLogo(logoUrl);
        
        toast({
          title: "Logo URL updated",
          description: "School logo has been updated successfully.",
        });
      } catch {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid image URL.",
          variant: "destructive",
        });
      }
    }
  };

  const updateSchoolInfoLogo = (logoSrc: string) => {
    setSchoolInfo({
      ...schoolInfo,
      name: schoolInfo?.name || "",
      address: schoolInfo?.address || "",
      session: schoolInfo?.session || new Date().getFullYear().toString(),
      term: schoolInfo?.term || "First",
      principalName: schoolInfo?.principalName || "",
      logo: logoSrc,
      signatories: schoolInfo?.signatories || {
        statementOfResult: { classTeacher: "", instructor: "" },
        certificate: { classTeacher: "", instructor: "" }
      }
    });
  };

  const handleSchoolInfoChange = (field: string, value: string) => {
    setSchoolInfo({
      ...schoolInfo,
      name: schoolInfo?.name || "",
      address: schoolInfo?.address || "",
      session: schoolInfo?.session || new Date().getFullYear().toString(),
      logo: schoolInfo?.logo || "/lovable-uploads/7cdd4f04-6759-4df0-98ca-039c85f03aa2.png",
      signatories: schoolInfo?.signatories || {
        statementOfResult: { classTeacher: "", instructor: "" },
        certificate: { classTeacher: "", instructor: "" }
      },
      [field]: value
    });
  };

  const handleSignatoryChange = (documentType: 'statementOfResult' | 'certificate', signatoryType: 'classTeacher' | 'instructor', value: string) => {
    setSchoolInfo({
      ...schoolInfo,
      name: schoolInfo?.name || "",
      address: schoolInfo?.address || "",
      session: schoolInfo?.session || new Date().getFullYear().toString(),
      term: schoolInfo?.term || "First",
      logo: schoolInfo?.logo || "/lovable-uploads/7cdd4f04-6759-4df0-98ca-039c85f03aa2.png",
      signatories: {
        ...schoolInfo?.signatories,
        [documentType]: {
          ...schoolInfo?.signatories?.[documentType],
          [signatoryType]: value
        }
      }
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
                  placeholder="Enter school/institution name"
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
              <div className="grid md:grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="session-term">Session Term (Optional)</Label>
                  <Select
                    value={schoolInfo?.term || "none"}
                    onValueChange={(value) => handleSchoolInfoChange('term', value === "none" ? "" : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select term (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="First">First Term</SelectItem>
                      <SelectItem value="Second">Second Term</SelectItem>
                      <SelectItem value="Third">Third Term</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Principal Name */}

              {/* Logo Upload */}
              <div className="space-y-2">
                <Label>School Logo</Label>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload File
                    </TabsTrigger>
                    <TabsTrigger value="url" className="flex items-center gap-2">
                      <Link className="w-4 h-4" />
                      From URL
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="mt-4">
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
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="url" className="mt-4">
                    <div className="flex gap-2">
                      <Input
                        type="url"
                        placeholder="Enter image URL (https://...)"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleLogoUrl}
                        size="default"
                        className="shrink-0"
                      >
                        <Image className="w-4 h-4 mr-2" />
                        Load
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* Logo Preview */}
                {logoPreview && (
                  <div className="mt-4">
                    <div className="w-20 h-20 border rounded-lg overflow-hidden bg-muted mx-auto">
                      <img
                        src={logoPreview}
                        alt="School logo preview"
                        className="w-full h-full object-contain"
                        onError={() => {
                          toast({
                            title: "Failed to load image",
                            description: "Please check the image URL or try a different image.",
                            variant: "destructive",
                          });
                          setLogoPreview(null);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Signatories Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <Label className="text-lg font-semibold">Document Signatories</Label>
                </div>
                
                {/* Statement of Result Signatories */}
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <Label className="font-medium">Statement of Result Signatory</Label>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Signatory Type</Label>
                      <Select
                        value={
                          schoolInfo?.signatories?.statementOfResult?.classTeacher ? 'classTeacher' :
                          schoolInfo?.signatories?.statementOfResult?.instructor ? 'instructor' : 'none'
                        }
                        onValueChange={(value) => {
                          if (value === 'classTeacher') {
                            handleSignatoryChange('statementOfResult', 'instructor', '');
                            handleSignatoryChange('statementOfResult', 'classTeacher', schoolInfo?.signatories?.statementOfResult?.classTeacher || '');
                          } else if (value === 'instructor') {
                            handleSignatoryChange('statementOfResult', 'classTeacher', '');
                            handleSignatoryChange('statementOfResult', 'instructor', schoolInfo?.signatories?.statementOfResult?.instructor || '');
                          } else if (value === 'none') {
                            handleSignatoryChange('statementOfResult', 'classTeacher', '');
                            handleSignatoryChange('statementOfResult', 'instructor', '');
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select signatory type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Select signatory type</SelectItem>
                          <SelectItem value="classTeacher">Class Teacher</SelectItem>
                          <SelectItem value="instructor">Instructor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(schoolInfo?.signatories?.statementOfResult?.classTeacher !== undefined) && (
                      <div className="space-y-2">
                        <Label htmlFor="statement-class-teacher">Class Teacher Name</Label>
                        <Input
                          id="statement-class-teacher"
                          type="text"
                          placeholder="Enter class teacher's name"
                          value={schoolInfo?.signatories?.statementOfResult?.classTeacher || ""}
                          onChange={(e) => handleSignatoryChange('statementOfResult', 'classTeacher', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    )}
                    
                    {(schoolInfo?.signatories?.statementOfResult?.instructor !== undefined) && (
                      <div className="space-y-2">
                        <Label htmlFor="statement-instructor">Instructor Name</Label>
                        <Input
                          id="statement-instructor"
                          type="text"
                          placeholder="Enter instructor's name"
                          value={schoolInfo?.signatories?.statementOfResult?.instructor || ""}
                          onChange={(e) => handleSignatoryChange('statementOfResult', 'instructor', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Certificate Signatories */}
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-primary" />
                    <Label className="font-medium">Certificate Signatory</Label>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Signatory Type</Label>
                      <Select
                        value={
                          schoolInfo?.signatories?.certificate?.classTeacher ? 'classTeacher' :
                          schoolInfo?.signatories?.certificate?.instructor ? 'instructor' : 'none'
                        }
                        onValueChange={(value) => {
                          if (value === 'classTeacher') {
                            handleSignatoryChange('certificate', 'instructor', '');
                            handleSignatoryChange('certificate', 'classTeacher', schoolInfo?.signatories?.certificate?.classTeacher || '');
                          } else if (value === 'instructor') {
                            handleSignatoryChange('certificate', 'classTeacher', '');
                            handleSignatoryChange('certificate', 'instructor', schoolInfo?.signatories?.certificate?.instructor || '');
                          } else if (value === 'none') {
                            handleSignatoryChange('certificate', 'classTeacher', '');
                            handleSignatoryChange('certificate', 'instructor', '');
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select signatory type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Select signatory type</SelectItem>
                          <SelectItem value="classTeacher">Class Teacher</SelectItem>
                          <SelectItem value="instructor">Instructor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(schoolInfo?.signatories?.certificate?.classTeacher !== undefined) && (
                      <div className="space-y-2">
                        <Label htmlFor="certificate-class-teacher">Class Teacher Name</Label>
                        <Input
                          id="certificate-class-teacher"
                          type="text"
                          placeholder="Enter class teacher's name"
                          value={schoolInfo?.signatories?.certificate?.classTeacher || ""}
                          onChange={(e) => handleSignatoryChange('certificate', 'classTeacher', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    )}
                    
                    {(schoolInfo?.signatories?.certificate?.instructor !== undefined) && (
                      <div className="space-y-2">
                        <Label htmlFor="certificate-instructor">Instructor Name</Label>
                        <Input
                          id="certificate-instructor"
                          type="text"
                          placeholder="Enter instructor's name"
                          value={schoolInfo?.signatories?.certificate?.instructor || ""}
                          onChange={(e) => handleSignatoryChange('certificate', 'instructor', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
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