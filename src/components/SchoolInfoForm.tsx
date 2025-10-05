import { useState, useEffect } from "react";
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
          description: "Logo has been updated successfully.",
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
      try {
        new URL(logoUrl);
        setLogoPreview(logoUrl);
        updateSchoolInfoLogo(logoUrl);
        
        toast({
          title: "Logo URL updated",
          description: "Logo has been updated successfully.",
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
      ...(schoolInfo || {}),
      logo: logoSrc,
    });
  };

  const handleSchoolInfoChange = (field: string, value: string) => {
    setSchoolInfo({
      ...(schoolInfo || {}),
      [field]: value
    });
  };

  // ensure type changes enforce document generation rules and clear irrelevant signatories
  const handleTypeChange = (value: "School" | "Institution") => {
    if (value === "School") {
      setSchoolInfo({
        ...(schoolInfo || {}),
        type: "School",
        // enable both documents by default for School
        generateStatementOfResult: true,
        generateCertificate: true,
        // ensure signatories keys exist
        signatories: {
          ...schoolInfo?.signatories,
          statementOfResult: schoolInfo?.signatories?.statementOfResult ?? {
            classTeacher: "",
            headTeacher: ""
          },
          certificate: schoolInfo?.signatories?.certificate ?? {
            classTeacher: "",
            headTeacher: ""
          }
        }
      });
    } else {
      // Institution: only certificate generation allowed
      setSchoolInfo({
        ...(schoolInfo || {}),
        type: "Institution",
        generateStatementOfResult: false,
        generateCertificate: true,
        // remove/clear statement of result signatories since it's not applicable
        signatories: {
          ...schoolInfo?.signatories,
          statementOfResult: undefined,
          certificate: schoolInfo?.signatories?.certificate ?? {
            instructor: "",
            headOfInstitution: ""
          }
        }
      });
    }
  };

  const handleSignatoryTypeChange = (
    documentType: 'statementOfResult' | 'certificate',
    signatoryType: string
  ) => {
    const isInstitution = schoolInfo?.type === 'Institution';
    
    setSchoolInfo({
      ...(schoolInfo || {}),
      signatories: {
        ...schoolInfo?.signatories,
        [documentType]: {
          signatoryType: signatoryType === 'none' ? undefined : signatoryType,
          // keep relevant fields for each document type and clear others
          classTeacher: documentType === 'statementOfResult' || (documentType === 'certificate' && schoolInfo?.type === 'School')
            ? (signatoryType === 'none' ? "" : "")
            : undefined,
          headTeacher: documentType === 'statementOfResult' || (documentType === 'certificate' && schoolInfo?.type === 'School')
            ? (signatoryType === 'none' ? "" : "")
            : undefined,
          instructor: documentType === 'certificate' && isInstitution
            ? (signatoryType === 'none' ? "" : "")
            : undefined,
          headOfInstitution: documentType === 'certificate' && isInstitution
            ? (signatoryType === 'none' ? "" : "")
            : undefined
        }
      }
    });
  };

  const handleSignatoryNameChange = (
    documentType: 'statementOfResult' | 'certificate',
    field: string,
    value: string
  ) => {
    setSchoolInfo({
      ...(schoolInfo || {}),
      signatories: {
        ...schoolInfo?.signatories,
        [documentType]: {
          ...schoolInfo?.signatories?.[documentType],
          [field]: value
        }
      }
    });
  };

  const isSchool = schoolInfo?.type === 'School';
  const isInstitution = schoolInfo?.type === 'Institution';

  // Initialize default schoolInfo to 'School' on first render if not set,
  // so the dropdown and conditional fields remain consistent.
  useEffect(() => {
    if (!schoolInfo) {
      setSchoolInfo({
        type: 'School',
        generateStatementOfResult: true,
        generateCertificate: true,
        signatories: {
          statementOfResult: {
            signatoryType: undefined,
            classTeacher: "",
            headTeacher: "",
          },
          certificate: {
            signatoryType: undefined,
            classTeacher: "",
            headTeacher: "",
          },
        },
      });
    }
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {/* Institution Type */}
              <div className="space-y-2">
                <Label htmlFor="institution-type">School or Institution *</Label>
                <Select
                  value={schoolInfo?.type || "School"}
                  onValueChange={(value) => handleTypeChange(value as "School" | "Institution")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="School">School</SelectItem>
                    <SelectItem value="Institution">Institution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Documents generation toggles - behavior enforced by type */}
              <div className="space-y-2">
                <Label>Documents to Generate</Label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!schoolInfo?.generateStatementOfResult}
                      onChange={(e) => setSchoolInfo({
                        ...(schoolInfo || {}),
                        generateStatementOfResult: e.target.checked
                      })}
                      disabled={isInstitution}
                    />
                    <span className={isInstitution ? "opacity-50" : ""}>Statement of Result</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!schoolInfo?.generateCertificate}
                      onChange={(e) => setSchoolInfo({
                        ...(schoolInfo || {}),
                        generateCertificate: e.target.checked
                      })}
                    />
                    <span>Certificate</span>
                  </label>
                </div>
                {isInstitution && (
                  <p className="text-xs text-muted-foreground">Institutions can only generate Certificates.</p>
                )}
              </div>

              {/* School/Institution Name */}
              <div className="space-y-2">
                <Label htmlFor="school-name">
                  {isSchool ? 'School Name' : 'Institution Name'} *
                </Label>
                <Input
                  id="school-name"
                  type="text"
                  placeholder={`Enter ${isSchool ? 'school' : 'institution'} name`}
                  value={schoolInfo?.name || ""}
                  onChange={(e) => handleSchoolInfoChange('name', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="school-address">
                  Address of the {isSchool ? 'School' : 'Institution'}
                </Label>
                <Textarea
                  id="school-address"
                  placeholder={`Enter ${isSchool ? 'school' : 'institution'} address`}
                  value={schoolInfo?.address || ""}
                  onChange={(e) => handleSchoolInfoChange('address', e.target.value)}
                  className="w-full resize-none"
                  rows={3}
                />
              </div>

              {/* Conditional Fields Based on Type */}
              {isSchool && (
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
                    <Label htmlFor="session-term">Session Term</Label>
                    <Select
                      value={schoolInfo?.term || ""}
                      onValueChange={(value) => handleSchoolInfoChange('term', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="First ">First Term</SelectItem>
                        <SelectItem value="Second ">Second Term</SelectItem>
                        <SelectItem value="Third ">Third Term</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {isInstitution && (
                <div className="space-y-2">
                  <Label htmlFor="date-of-issuance">Date of Issuance</Label>
                  <Input
                    id="date-of-issuance"
                    type="date"
                    value={schoolInfo?.dateOfIssuance || ""}
                    onChange={(e) => handleSchoolInfoChange('dateOfIssuance', e.target.value)}
                    className="w-full"
                  />
                </div>
              )}

              {/* Result Remark */}
              {/* <div className="space-y-2">
                <Label htmlFor="result-remark">Result Remark</Label>
                <Textarea
                  id="result-remark"
                  placeholder="Enter result remark or achievements (e.g., 'Excellent performance')"
                  value={schoolInfo?.resultRemark || ""}
                  onChange={(e) => handleSchoolInfoChange('resultRemark', e.target.value)}
                  className="w-full resize-none"
                  rows={3}
                />
              </div> */}

              {/* Logo Upload */}
              <div className="space-y-2">
                <Label>Logo</Label>
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
                        alt="Logo preview"
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
                
                {/* Statement of Result Signatories - Only for Schools */}
                {isSchool && schoolInfo?.generateStatementOfResult && (
                  <div className="space-y-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <Label className="font-medium">Statement of Result Signatory</Label>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Signatory Type</Label>
                        <Select
                          value={schoolInfo?.signatories?.statementOfResult?.signatoryType || 'none'}
                          onValueChange={(value) => handleSignatoryTypeChange('statementOfResult', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select signatory type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Select signatory type</SelectItem>
                            <SelectItem value="Class Teacher">Class Teacher</SelectItem>
                            <SelectItem value="Head Teacher">Head Teacher</SelectItem>
                            <SelectItem value="Both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {(schoolInfo?.signatories?.statementOfResult?.signatoryType === 'Class Teacher' || 
                        schoolInfo?.signatories?.statementOfResult?.signatoryType === 'Both') && (
                        <div className="space-y-2">
                          <Label htmlFor="statement-class-teacher">Class Teacher Name</Label>
                          <Input
                            id="statement-class-teacher"
                            type="text"
                            placeholder="Enter class teacher's name"
                            value={schoolInfo?.signatories?.statementOfResult?.classTeacher || ""}
                            onChange={(e) => handleSignatoryNameChange('statementOfResult', 'classTeacher', e.target.value)}
                            className="w-full"
                          />
                        </div>
                      )}
                      
                      {(schoolInfo?.signatories?.statementOfResult?.signatoryType === 'Head Teacher' || 
                        schoolInfo?.signatories?.statementOfResult?.signatoryType === 'Both') && (
                        <div className="space-y-2">
                          <Label htmlFor="statement-head-teacher">Head Teacher Name</Label>
                          <Input
                            id="statement-head-teacher"
                            type="text"
                            placeholder="Enter head teacher's name"
                            value={schoolInfo?.signatories?.statementOfResult?.headTeacher || ""}
                            onChange={(e) => handleSignatoryNameChange('statementOfResult', 'headTeacher', e.target.value)}
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Certificate Signatories */}
                {schoolInfo?.generateCertificate && (
                  <div className="space-y-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-primary" />
                      <Label className="font-medium">Certificate Signatory</Label>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Signatory Type</Label>
                        <Select
                          value={schoolInfo?.signatories?.certificate?.signatoryType || 'none'}
                          onValueChange={(value) => handleSignatoryTypeChange('certificate', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select signatory type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Select signatory type</SelectItem>
                            {isSchool && (
                              <>
                                <SelectItem value="Class Teacher">Class Teacher</SelectItem>
                                <SelectItem value="Head Teacher">Head Teacher</SelectItem>
                                <SelectItem value="Both">Both</SelectItem>
                              </>
                            )}
                            {isInstitution && (
                              <>
                                <SelectItem value="Instructor Name">Instructor Name</SelectItem>
                                <SelectItem value="Head of Institution Name">Head of Institution Name</SelectItem>
                                <SelectItem value="Both">Both</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* School Certificate Signatories */}
                      {isSchool && (
                        <>
                          {(schoolInfo?.signatories?.certificate?.signatoryType === 'Class Teacher' || 
                            schoolInfo?.signatories?.certificate?.signatoryType === 'Both') && (
                            <div className="space-y-2">
                              <Label htmlFor="certificate-class-teacher">Class Teacher Name</Label>
                              <Input
                                id="certificate-class-teacher"
                                type="text"
                                placeholder="Enter class teacher's name"
                                value={schoolInfo?.signatories?.certificate?.classTeacher || ""}
                                onChange={(e) => handleSignatoryNameChange('certificate', 'classTeacher', e.target.value)}
                                className="w-full"
                              />
                            </div>
                          )}
                          
                          {(schoolInfo?.signatories?.certificate?.signatoryType === 'Head Teacher' || 
                            schoolInfo?.signatories?.certificate?.signatoryType === 'Both') && (
                            <div className="space-y-2">
                              <Label htmlFor="certificate-head-teacher">Head Teacher Name</Label>
                              <Input
                                id="certificate-head-teacher"
                                type="text"
                                placeholder="Enter head teacher's name"
                                value={schoolInfo?.signatories?.certificate?.headTeacher || ""}
                                onChange={(e) => handleSignatoryNameChange('certificate', 'headTeacher', e.target.value)}
                                className="w-full"
                              />
                            </div>
                          )}
                        </>
                      )}

                      {/* Institution Certificate Signatories */}
                      {isInstitution && (
                        <>
                          {(schoolInfo?.signatories?.certificate?.signatoryType === 'Instructor Name' || 
                            schoolInfo?.signatories?.certificate?.signatoryType === 'Both') && (
                            <div className="space-y-2">
                              <Label htmlFor="certificate-instructor">Instructor Name</Label>
                              <Input
                                id="certificate-instructor"
                                type="text"
                                placeholder="Enter instructor's name"
                                value={schoolInfo?.signatories?.certificate?.instructor || ""}
                                onChange={(e) => handleSignatoryNameChange('certificate', 'instructor', e.target.value)}
                                className="w-full"
                              />
                            </div>
                          )}
                          
                          {(schoolInfo?.signatories?.certificate?.signatoryType === 'Head of Institution Name' || 
                            schoolInfo?.signatories?.certificate?.signatoryType === 'Both') && (
                            <div className="space-y-2">
                              <Label htmlFor="certificate-head-institution">Head of Institution Name</Label>
                              <Input
                                id="certificate-head-institution"
                                type="text"
                                placeholder="Enter head of institution's name"
                                value={schoolInfo?.signatories?.certificate?.headOfInstitution || ""}
                                onChange={(e) => handleSignatoryNameChange('certificate', 'headOfInstitution', e.target.value)}
                                className="w-full"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Status indicator */}
              {schoolInfo?.name && (
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Check className="w-4 h-4" />
                  Information updated
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
