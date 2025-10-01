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
  session?: string;
  term?: string;
  logo?: string;
  institutionType?: 'school' | 'institution';
  dateOfIssuance?: string;
  signatories?: {
    statementOfResult?: {
      classTeacher?: string;
      instructor?: string;
      headTeacher?: string;
      headOfInstitution?: string;
    };
    certificate?: {
      classTeacher?: string;
      instructor?: string;
      headTeacher?: string;
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
    address: "",
    session: new Date().getFullYear().toString(),
    term: "",
    logo: "/src/assets/ChatGPT Image Sep 18, 2025, 04_58_51 PM.png",
    institutionType: 'school',
    signatories: {
      statementOfResult: {
        classTeacher: "",
        instructor: "",
        headTeacher: "",
        headOfInstitution: ""
      },
      certificate: {
        classTeacher: "",
        instructor: "",
        headTeacher: "",
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