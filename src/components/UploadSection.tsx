import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileSpreadsheet, 
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStudentData } from "@/hooks/useStudentData";
import { processExcelFile, processCsvFile } from "@/services/fileProcessor";
import { CertificateGenerator } from "./CertificateGenerator";

export const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [showCertificates, setShowCertificates] = useState(false);
  const { toast } = useToast();
  const { setStudents, setUploadedFileName, setSchoolInfo, clearData } = useStudentData();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = async (file: File) => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];

    if (validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      setUploadedFile(file);
      setUploadStatus('uploading');
      
      try {
        let result;
        if (file.name.endsWith('.csv')) {
          result = await processCsvFile(file);
        } else {
          result = await processExcelFile(file);
        }
        
        setStudents(result.students);
        setSchoolInfo(result.schoolInfo);
        setUploadedFileName(file.name);
        setUploadStatus('success');
        
        toast({
          title: "File processed successfully!",
          description: `Found ${result.students.length} student records. Ready to generate certificates.`,
        });
      } catch (error) {
        setUploadStatus('error');
        toast({
          title: "Processing failed",
          description: error instanceof Error ? error.message : "Failed to process the file. Please check the format and try again.",
          variant: "destructive",
        });
      }
    } else {
      setUploadStatus('error');
      toast({
        title: "Invalid file type",
        description: "Please upload Excel (.xlsx, .xls) or CSV files only.",
        variant: "destructive",
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setShowCertificates(false);
    clearData();
  };

  const handleGenerateCertificates = () => {
    setShowCertificates(true);
    toast({
      title: "Certificates Ready!",
      description: "You can now preview and download individual or all certificates.",
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Upload Your Student Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload Excel or CSV files containing student data and assessment results. 
            Our system will automatically process and generate professional certificates.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-dashed border-primary/20 bg-primary/5 hover:border-primary/40 transition-colors">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Upload className="w-6 h-6 text-primary" />
                File Upload
              </CardTitle>
              <CardDescription className="text-base">
                Drag and drop your files here, or click to browse
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {uploadStatus === 'idle' && (
                <div
                  className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div>
                      <p className="text-lg font-medium text-foreground mb-2">
                        Drop your files here
                      </p>
                      <p className="text-muted-foreground mb-4">
                        Supports Excel (.xlsx, .xls) and CSV files
                      </p>
                      
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <Button variant="default" asChild>
                          <span>Browse Files</span>
                        </Button>
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {uploadStatus === 'uploading' && (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-glow">
                    <FileSpreadsheet className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    Processing your file...
                  </p>
                  <p className="text-muted-foreground">
                    Analyzing student data and preparing result statements
                  </p>
                </div>
              )}

              {uploadStatus === 'success' && uploadedFile && (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    File uploaded successfully!
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {uploadedFile.name} • {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    {!showCertificates ? (
                      <Button 
                        variant="success"
                        onClick={handleGenerateCertificates}
                        aria-label="Generate certificates for all students"
                      >
                        Generate Certificates
                        <Award className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        onClick={() => setShowCertificates(false)}
                        aria-label="Return to upload summary"
                      >
                        Back to Summary
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={resetUpload}
                      aria-label="Upload another file"
                    >
                      Upload Another File
                    </Button>
                  </div>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-destructive" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    Upload failed
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Please check your file format and try again
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={resetUpload}
                    aria-label="Try uploading file again"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Certificate Generator */}
          {showCertificates && (
            <div className="mt-8">
              <CertificateGenerator />
            </div>
          )}

          {/* Supported Formats */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Card className="text-center hover:shadow-academic transition-shadow">
              <CardContent className="p-6">
                <FileSpreadsheet className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Excel Files</h3>
                <div className="space-x-2">
                  <Badge variant="secondary">.xlsx</Badge>
                  <Badge variant="secondary">.xls</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-academic transition-shadow">
              <CardContent className="p-6">
                <FileText className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">CSV Files</h3>
                <Badge variant="secondary">.csv</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-academic transition-shadow">
              <CardContent className="p-6">
                <Download className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Sample Template</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast({
                    title: "Downloading Template",
                    description: "Sample Excel template will be downloaded shortly.",
                  })}
                  aria-label="Download sample Excel template"
                >
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

