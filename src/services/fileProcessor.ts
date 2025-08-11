import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { StudentRecord } from '@/hooks/useStudentData';

const calculateGrade = (average: number): string => {
  if (average >= 80) return 'A';
  if (average >= 70) return 'B';
  if (average >= 60) return 'C';
  if (average >= 50) return 'D';
  return 'F';
};

export const processExcelFile = (file: File): Promise<StudentRecord[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        const students = processRawData(jsonData);
        resolve(students);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

export const processCsvFile = (file: File): Promise<StudentRecord[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        try {
          const students = processRawData(results.data as any[][]);
          resolve(students);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error)
    });
  });
};

const processRawData = (data: any[][]): StudentRecord[] => {
  if (data.length < 2) {
    throw new Error('File must contain at least a header row and one data row');
  }
  
  const headers = data[0].map((header: any) => String(header).toLowerCase().trim());
  const nameIndex = headers.findIndex(h => h.includes('name'));
  const classIndex = headers.findIndex(h => h.includes('class'));
  
  if (nameIndex === -1) {
    throw new Error('File must contain a "Name" column');
  }
  
  // Find subject columns (assuming they're numeric columns that aren't name/class)
  const subjectIndices: number[] = [];
  const subjectNames: string[] = [];
  
  headers.forEach((header, index) => {
    if (index !== nameIndex && index !== classIndex && header && 
        !header.includes('total') && !header.includes('average')) {
      subjectIndices.push(index);
      subjectNames.push(data[0][index]);
    }
  });
  
  if (subjectIndices.length === 0) {
    throw new Error('File must contain at least one subject column with numeric scores');
  }
  
  const students: StudentRecord[] = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row || row.length === 0) continue;
    
    const name = String(row[nameIndex] || '').trim();
    if (!name) continue;
    
    const subjects: { [subject: string]: number } = {};
    let totalMarks = 0;
    let validSubjects = 0;
    
    subjectIndices.forEach((index, subjectIndex) => {
      const score = parseFloat(row[index]);
      if (!isNaN(score)) {
        subjects[subjectNames[subjectIndex]] = score;
        totalMarks += score;
        validSubjects++;
      }
    });
    
    if (validSubjects === 0) continue;
    
    const averageScore = totalMarks / validSubjects;
    const grade = calculateGrade(averageScore);
    
    students.push({
      id: `student-${i}`,
      name,
      class: classIndex !== -1 ? String(row[classIndex] || '') : '',
      subjects,
      totalMarks,
      averageScore: Math.round(averageScore * 100) / 100,
      grade
    });
  }
  
  if (students.length === 0) {
    throw new Error('No valid student records found in the file');
  }
  
  return students;
};