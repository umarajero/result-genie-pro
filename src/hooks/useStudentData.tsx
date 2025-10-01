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
  type?: 'School' | 'Institution';
  address?: string;
  session?: string;
  term?: string;
  dateOfIssuance?: string;
  logo?: string;
  resultRemark?: string;
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
  setSchoolInfo: (schoolInfo: SchoolInfo | null) => void;
  clearData: () => void;
}

const StudentDataContext = createContext<StudentDataContextType | undefined>(undefined);

export const StudentDataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>({
    name: "",
    type: "School",
    address: "",
    session: new Date().getFullYear().toString(),
    term: "",
    dateOfIssuance: "",
    logo: "/src/assets/ChatGPT Image Sep 18, 2025, 04_58_51 PM.png",
    signatories: {
      statementOfResult: {
        signatoryType: undefined,
        classTeacher: "",
        headTeacher: ""
      },
      certificate: {
        signatoryType: undefined,
        classTeacher: "",
        headTeacher: "",
        instructor: "",
        headOfInstitution: ""
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