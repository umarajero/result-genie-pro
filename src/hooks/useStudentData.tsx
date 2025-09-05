import { createContext, useContext, useState, ReactNode } from 'react';

export interface StudentRecord {
  id: string;
  name: string;
  class: string;
  serialNumber?: string;
  regNumber?: string;
  subjects: {
    [subject: string]: number;
  };
  totalMarks: number;
  averageScore: number;
  grade: string;
}

export interface SchoolInfo {
  name: string;
  address?: string;
  principalName?: string;
  session?: string;
  term?: string;
  logo?: string;
  signatories?: {
    statementOfResult?: {
      classTeacher?: string;
      instructor?: string;
    };
    certificate?: {
      classTeacher?: string;
      instructor?: string;
    };
  };
}

interface StudentDataContextType {
  students: StudentRecord[];
  setStudents: (students: StudentRecord[]) => void;
  uploadedFileName: string | null;
  setUploadedFileName: (fileName: string | null) => void;
  schoolInfo: SchoolInfo | null;
  setSchoolInfo: (schoolInfo: SchoolInfo | null) => void;
  clearData: () => void;
}

const StudentDataContext = createContext<StudentDataContextType | undefined>(undefined);

export const StudentDataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>({
    name: "ElevateHer Innovation Space Limited",
    address: "",
    session: new Date().getFullYear().toString(),
    term: "",
    principalName: "",
    logo: "/lovable-uploads/7cdd4f04-6759-4df0-98ca-039c85f03aa2.png",
    signatories: {
      statementOfResult: {
        classTeacher: "",
        instructor: ""
      },
      certificate: {
        classTeacher: "",
        instructor: ""
      }
    }
  });

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