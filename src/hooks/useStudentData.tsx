import { createContext, useContext, useState, ReactNode } from 'react';

export interface StudentRecord {
  id: string;
  name: string;
  class: string;
  subjects: {
    [subject: string]: number;
  };
  totalMarks: number;
  averageScore: number;
  grade: string;
}

interface StudentDataContextType {
  students: StudentRecord[];
  setStudents: (students: StudentRecord[]) => void;
  uploadedFileName: string | null;
  setUploadedFileName: (fileName: string | null) => void;
  clearData: () => void;
}

const StudentDataContext = createContext<StudentDataContextType | undefined>(undefined);

export const StudentDataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const clearData = () => {
    setStudents([]);
    setUploadedFileName(null);
  };

  return (
    <StudentDataContext.Provider value={{
      students,
      setStudents,
      uploadedFileName,
      setUploadedFileName,
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