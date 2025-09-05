import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatementOfResult } from './StatementOfResult';
import { Certificate } from './Certificate';
import { useStudentData } from '@/hooks/useStudentData';
import { ChevronLeft, ChevronRight, Download, Users, Award, FileText, Medal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const getOrdinalSuffix = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
};

export const CertificateGenerator = () => {
  const { students, uploadedFileName, schoolInfo } = useStudentData();
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState("statement");
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Award className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No Student Data Available
        </h3>
        <p className="text-muted-foreground">
          Please upload a file with student data first to generate certificates.
        </p>
      </div>
    );
  }

  // Calculate values for certificate
  const currentStudent = students[currentStudentIndex];
  const subjects = Object.entries(currentStudent.subjects).map(([name, score]) => ({
    name,
    score,
    grade: score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : 'F'
  }));
  const totalMarks = subjects.reduce((sum, subject) => sum + subject.score, 0);
  const averageScore = Math.round(totalMarks / subjects.length);
  const getGradeFromAverage = (avg: number) => {
    if (avg >= 80) return "A";
    if (avg >= 70) return "B";
    if (avg >= 60) return "C";
    if (avg >= 50) return "D";
    if (avg >= 40) return "E";
    return "F";
  };

  const handlePrevious = () => {
    setCurrentStudentIndex(prev => 
      prev > 0 ? prev - 1 : students.length - 1
    );
  };

  const handleNext = () => {
    setCurrentStudentIndex(prev => 
      prev < students.length - 1 ? prev + 1 : 0
    );
  };

  const handleDownloadCertificate = async () => {
    if (!certificateRef.current || isDownloading) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const documentType = activeTab === "statement" ? "Statement" : "Certificate";
      pdf.save(`${currentStudent.name}_${documentType}.pdf`);
      
      toast({
        title: "Download Successful",
        description: `${documentType} for ${currentStudent.name} has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadAll = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const documentType = activeTab === "statement" ? "Statements" : "Certificates";
      
      for (let i = 0; i < students.length; i++) {
        if (i > 0) {
          setCurrentStudentIndex(i);
          // Wait a bit for the component to re-render
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (certificateRef.current) {
          const canvas = await html2canvas(certificateRef.current, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }
      }
      
      pdf.save(`All_${documentType}_${schoolInfo?.name || 'School'}.pdf`);
      
      toast({
        title: "Download Successful",
        description: `All ${students.length} ${documentType.toLowerCase()} have been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating the PDFs. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Document Generator
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Source: {uploadedFileName}
              </p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {students.length} Students
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Document Type Tabs */}
          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="statement" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Statement of Result
                </TabsTrigger>
                <TabsTrigger value="certificate" className="flex items-center gap-2">
                  <Medal className="w-4 h-4" />
                  Certificate
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={students.length <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {currentStudentIndex + 1} of {students.length}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={students.length <= 1}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleDownloadCertificate}
                disabled={isDownloading}
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Generating...' : 'Download This'}
              </Button>
              <Button
                variant="default"
                onClick={handleDownloadAll}
                disabled={isDownloading}
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Generating...' : `Download All (${students.length})`}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Preview */}
      <div ref={certificateRef}>
        {activeTab === "statement" ? (
          <StatementOfResult
            studentName={currentStudent.name}
            className={currentStudent.class}
            serialNumber={currentStudent.serialNumber}
            regNumber={currentStudent.regNumber}
            session={schoolInfo?.session || new Date().getFullYear().toString()}
            term={`${schoolInfo?.term || "First"} Term`}
            position={`${currentStudentIndex + 1}${getOrdinalSuffix(currentStudentIndex + 1)}`}
            totalStudents={students.length}
            schoolName={schoolInfo?.name || ""}
            schoolAddress={schoolInfo?.address || ""}
            schoolContact={schoolInfo?.principalName ? `Principal: ${schoolInfo.principalName}` : ""}
            schoolLogo={schoolInfo?.logo}
            subjects={subjects}
            dateIssued={new Date().toLocaleDateString()}
            signatories={schoolInfo?.signatories?.statementOfResult}
          />
        ) : (
          <Certificate
            studentName={currentStudent.name}
            className={currentStudent.class}
            session={schoolInfo?.session || new Date().getFullYear().toString()}
            term={`${schoolInfo?.term || "First"} Term`}
            position={`${currentStudentIndex + 1}${getOrdinalSuffix(currentStudentIndex + 1)}`}
            totalStudents={students.length}
            schoolName={schoolInfo?.name || ""}
            schoolAddress={schoolInfo?.address || ""}
            schoolContact={schoolInfo?.principalName ? `Principal: ${schoolInfo.principalName}` : ""}
            schoolLogo={schoolInfo?.logo}
            averageScore={averageScore}
            overallGrade={getGradeFromAverage(averageScore)}
            dateIssued={new Date().toLocaleDateString()}
            signatories={schoolInfo?.signatories?.certificate}
          />
        )}
      </div>
    </div>
  );
};