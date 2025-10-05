import { createContext, useContext, useState, ReactNode } from 'react';

export interface StudentRecord {
  id: string;
  name: string;
  class: string;
  serialNumber?: string;
  regNumber?: string;
  email?: string;
  subjects: {
    [subject: string]: number;
  };
  totalMarks: number;
  averageScore: number;
  grade: string;
}

export interface SchoolInfo {
  name?: string;
  type?: 'School' | 'Institution';
  address?: string;
  session?: string;
  term?: string;
  dateOfIssuance?: string;
  logo?: string;
  resultRemark?: string;
  generateStatementOfResult?: boolean;
  generateCertificate?: boolean;
  signatories?: {
    statementOfResult?: {
      signatoryType?: 'Class Teacher' | 'Head Teacher' | 'Both';
      classTeacher?: string;
      headTeacher?: string;
    };
    certificate?: {
      signatoryType?: 'Class Teacher' | 'Head Teacher' | 'Both' | 'Instructor Name' | 'Head of Institution Name';
      classTeacher?: string;
      headTeacher?: string;
      instructor?: string;
      headOfInstitution?: string;
    };
  };
}

interface StudentDataContextType {
  students: StudentRecord[];
  setStudents: (students: StudentRecord[]) => void;
  uploadedFileName: string | null;
  setUploadedFileName: (fileName: string | null) => void;
  schoolInfo: SchoolInfo | null;
  setSchoolInfo: (schoolInfo: SchoolInfo | null | ((prev: SchoolInfo | null) => SchoolInfo | null)) => void;
  clearData: () => void;
}

const StudentDataContext = createContext<StudentDataContextType | undefined>(undefined);

export const StudentDataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null);

  const clearData = () => {
    setStudents([]);
    setUploadedFileName(null);
    setSchoolInfo(null);
  };

  return (
    <StudentDataContext.Provider value={{
      students,
      setStudents,
      uploadedFileName,
      setUploadedFileName,
      schoolInfo,
      setSchoolInfo,
      clearData
    }}>
      {children}
    </StudentDataContext.Provider>
  );
};

export const useStudentData = () => {
  const context = useContext(StudentDataContext);
  if (context === undefined) {
    throw new Error('useStudentData must be used within a StudentDataProvider');
  }
  return context;
};