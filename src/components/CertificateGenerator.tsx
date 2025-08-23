import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CertificateTemplate } from './CertificateTemplate';
import { useStudentData } from '@/hooks/useStudentData';
import { ChevronLeft, ChevronRight, Download, Users, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const currentStudent = students[currentStudentIndex];

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

  const handleDownloadCertificate = () => {
    toast({
      title: "Downloading Certificate",
      description: `Certificate for ${currentStudent.name} will be downloaded as PDF.`,
    });
  };

  const handleDownloadAll = () => {
    toast({
      title: "Generating All Certificates",
      description: `Creating ${students.length} certificates. This may take a moment...`,
    });
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
                Certificate Generator
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
              >
                <Download className="w-4 h-4 mr-2" />
                Download This
              </Button>
              <Button
                variant="default"
                onClick={handleDownloadAll}
              >
                <Download className="w-4 h-4 mr-2" />
                Download All ({students.length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Preview */}
      <CertificateTemplate
        studentName={currentStudent.name}
        className={currentStudent.class}
        serialNumber={currentStudent.serialNumber}
        regNumber={currentStudent.regNumber}
        session={schoolInfo?.session || new Date().getFullYear().toString()}
        term="First Term"
        position={`${currentStudentIndex + 1}${getOrdinalSuffix(currentStudentIndex + 1)}`}
        totalStudents={students.length}
        schoolName={schoolInfo?.name || "School Name"}
        schoolAddress={schoolInfo?.address || "School Address"}
        schoolContact={schoolInfo?.principalName ? `Principal: ${schoolInfo.principalName}` : ""}
        subjects={Object.entries(currentStudent.subjects).map(([name, score]) => ({
          name,
          score,
          grade: score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : 'F'
        }))}
        dateIssued={new Date().toLocaleDateString()}
      />
    </div>
  );
};