import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { StudentRecord, SchoolInfo } from '@/hooks/useStudentData';

const calculateGrade = (average: number): string => {
  if (average >= 80) return 'A';
  if (average >= 70) return 'B';
  if (average >= 60) return 'C';
  if (average >= 50) return 'D';
  return 'F';
};

export const processExcelFile = (file: File): Promise<{ students: StudentRecord[], schoolInfo: Partial<SchoolInfo> }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        const result = processRawData(jsonData);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

export const processCsvFile = (file: File): Promise<{ students: StudentRecord[], schoolInfo: Partial<SchoolInfo> }> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        try {
          const result = processRawData(results.data as any[][]);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error)
    });
  });
};

const processRawData = (data: any[][]): { students: StudentRecord[], schoolInfo: Partial<SchoolInfo> } => {
  if (data.length < 2) {
    throw new Error('File must contain at least a header row and one data row');
  }
  
  console.log('Starting file analysis...');
  
  // Extract school information from the first few rows (only extract data found in file)
  let schoolInfo: Partial<SchoolInfo> = {};
  let headerRowIndex = 0;
  
  // Look for school information in the first 8 rows
  for (let i = 0; i < Math.min(8, data.length); i++) {
    const row = data[i];
    if (!row || row.length === 0) continue;
    
    const rowText = row.join(' ').toLowerCase();
    const fullRowText = row.join(' ').trim();
    
    // Look for school/institute name - prioritize longer, more descriptive names
    if ((rowText.includes('school') || rowText.includes('institute') || rowText.includes('college') || rowText.includes('university') || rowText.includes('academy')) && !schoolInfo.name.includes('Academic Institution')) {
      const schoolName = row.find(cell => {
        const cellStr = String(cell).trim();
        const cellLower = cellStr.toLowerCase();
        return cellStr.length > 5 && (
          cellLower.includes('school') || cellLower.includes('institute') || 
          cellLower.includes('college') || cellLower.includes('university') || 
          cellLower.includes('academy')
        );
      });
      if (schoolName) {
        schoolInfo.name = String(schoolName).trim();
      }
    }
    
    // Look for address (usually contains location keywords)
    if (!schoolInfo.address && (rowText.includes('address') || rowText.includes('street') || rowText.includes('road') || rowText.includes('avenue') || rowText.includes('city') || rowText.includes('state'))) {
      const addressCell = row.find(cell => {
        const cellStr = String(cell).trim();
        const cellLower = cellStr.toLowerCase();
        return cellStr.length > 10 && (
          cellLower.includes('street') || cellLower.includes('road') || 
          cellLower.includes('avenue') || cellLower.includes('city') || 
          cellLower.includes('address') || cellLower.includes('location')
        );
      });
      if (addressCell) {
        schoolInfo.address = String(addressCell).trim();
      }
    }
    
    // Look for academic session (formats like 2023/2024, 2023-2024, etc.)
    if (!schoolInfo.session) {
      const sessionPattern = /(\d{4})[\/\-](\d{4})/;
      const sessionMatch = fullRowText.match(sessionPattern);
      if (sessionMatch) {
        schoolInfo.session = sessionMatch[0];
      } else {
        // Look for single year or other session formats
        const yearPattern = /\b(20\d{2})\b/;
        const yearMatch = fullRowText.match(yearPattern);
        if (yearMatch && (rowText.includes('session') || rowText.includes('academic') || rowText.includes('year'))) {
          schoolInfo.session = yearMatch[0];
        }
      }
    }
    
    // Check if this row contains headers (name, subjects, etc.)
    const hasName = row.some((cell: any) => String(cell).toLowerCase().includes('name'));
    const hasSubjects = row.some((cell: any) => {
      const cellStr = String(cell).toLowerCase();
      return cellStr.includes('math') || cellStr.includes('english') || cellStr.includes('science') || 
             cellStr.includes('subject') || cellStr.includes('marks') || cellStr.includes('score');
    });
    
    if (hasName && (hasSubjects || row.length > 3)) {
      headerRowIndex = i;
      break;
    }
  }
  
  const headers = data[headerRowIndex].map((header: any) => String(header).toLowerCase().trim());
  
  console.log('Headers found:', headers);
  
  // More flexible name detection
  const nameIndex = headers.findIndex(h => 
    h.includes('name') || h.includes('student') || h === 'names' || h === 'full name'
  );
  
  // More flexible class detection
  const classIndex = headers.findIndex(h => 
    h.includes('class') || h.includes('grade') || h.includes('level') || h.includes('section')
  );
  
  // Find S/N (Serial Number) column
  const serialNumberIndex = headers.findIndex(h => 
    h.includes('s/n') || h.includes('sn') || h.includes('serial') || h === 's.n' || h === 'no'
  );
  
  // Find REG No (Registration Number) column
  const regNumberIndex = headers.findIndex(h =>
    h.includes('reg') || h.includes('registration') || h.includes('regno') || h.includes('reg no') || h.includes('reg.no')
  );

  const emailIndex = headers.findIndex(h =>
    h.includes('email') || h.includes('e-mail') || h.includes('mail')
  );

  if (nameIndex === -1) {
    throw new Error('File must contain a column with student names (Name, Student Name, etc.)');
  }
  
  // Find subject columns - more flexible detection
  const subjectIndices: number[] = [];
  const subjectNames: string[] = [];
  
  // Identify ID column patterns to exclude from calculations
  const idColumnPatterns = [
    'id', 'student id', 'student number', 'studentid', 'student_id', 'student_number',
    'student no', 'studentno', 'student_no', 'roll no', 'rollno', 'roll_no',
    'admission no', 'admissionno', 'admission_no', 'matric no', 'matricno', 'matric_no',
    'index no', 'indexno', 'index_no', 'candidate no', 'candidateno', 'candidate_no'
  ];
  
  // Find and log ID columns for transparency
  const idColumns: string[] = [];
  const idColumnIndices: number[] = [];
  
  headers.forEach((header, index) => {
    const isIdColumn = idColumnPatterns.some(pattern => header.includes(pattern));
    if (isIdColumn) {
      idColumns.push(header);
      idColumnIndices.push(index);
    }
  });
  
  // Enhanced logging for transparency
  console.log('=== COLUMN ANALYSIS ===');
  console.log('Total columns found:', headers.length);
  console.log('All headers:', headers);
  console.log('ID columns identified and EXCLUDED from calculations:', idColumns.length > 0 ? idColumns : 'None');
  
  // Validate that we're not accidentally including ID columns in calculations
  const validateNoIdColumns = (columnName: string, columnIndex: number) => {
    if (idColumnIndices.includes(columnIndex)) {
      console.warn(`WARNING: Attempted to include ID column "${columnName}" in calculations - BLOCKED`);
      return false;
    }
    return true;
  };
  
  headers.forEach((header, index) => {
    const isIdColumn = idColumnPatterns.some(pattern => header.includes(pattern));
  });
  
  if (idColumns.length > 0) {
    console.log('ID columns identified and excluded from calculations:', idColumns);
  }
  
  headers.forEach((header, index) => {
    const isIdColumn = idColumnPatterns.some(pattern => header.includes(pattern));

    if (index !== nameIndex &&
        index !== classIndex &&
        index !== serialNumberIndex &&
        index !== regNumberIndex &&
        index !== emailIndex &&
        !isIdColumn &&
        header &&
        header.length > 0) {
      // Skip common non-subject columns
      const skipColumns = [
        'total', 'average', 'percentage', 'rank', 'position', 'remarks', 
        'attendance', 's/n', 'sn', 'serial', 'reg', 'registration', 'regno'
      ];
      const isSkipColumn = skipColumns.some(skip => header.includes(skip));
      
      if (!isSkipColumn && validateNoIdColumns(header, index)) {
        // Check if the column contains mostly numeric data
        let numericCount = 0;
        let totalCount = 0;
        
        for (let i = headerRowIndex + 1; i < Math.min(headerRowIndex + 6, data.length); i++) {
          if (data[i] && data[i][index] !== undefined && data[i][index] !== null) {
            totalCount++;
            const value = parseFloat(data[i][index]);
            if (!isNaN(value)) {
              numericCount++;
            }
          }
        }
        
        // If more than 50% of the values are numeric, consider it a subject
        if (totalCount > 0 && numericCount / totalCount >= 0.5) {
          subjectIndices.push(index);
          subjectNames.push(data[headerRowIndex][index]);
        }
      }
    }
  });
  
  if (subjectIndices.length === 0) {
    throw new Error('File must contain at least one subject column with numeric scores');
  }
  
  // Enhanced logging for complete transparency
  console.log('=== CALCULATION COLUMNS ===');
  console.log('Subject columns INCLUDED in calculations:', subjectNames);
  console.log('Number of subjects for calculation:', subjectNames.length);
  
  const excludedColumns = headers.filter((_, index) =>
    !subjectIndices.includes(index) &&
    index !== nameIndex &&
    index !== classIndex &&
    index !== serialNumberIndex &&
    index !== regNumberIndex &&
    index !== emailIndex
  );
  console.log('=== EXCLUDED COLUMNS ===');
  console.log('All excluded columns:', excludedColumns);
  console.log('ID columns specifically excluded:', idColumns);
  console.log('========================');
  
  const students: StudentRecord[] = [];
  
  for (let i = headerRowIndex + 1; i < data.length; i++) {
    const row = data[i];
    if (!row || row.length === 0) continue;
    
    const name = String(row[nameIndex] || '').trim();
    if (!name || name.length < 2) continue;
    
    const subjects: { [subject: string]: number } = {};
    let totalMarks = 0;
    let validSubjects = 0;
    
    subjectIndices.forEach((index, subjectIndex) => {
      const score = parseFloat(row[index]);
      if (!isNaN(score) && score >= 0) {
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
      serialNumber: serialNumberIndex !== -1 ? String(row[serialNumberIndex] || '') : undefined,
      regNumber: regNumberIndex !== -1 ? String(row[regNumberIndex] || '') : undefined,
      email: emailIndex !== -1 ? String(row[emailIndex] || '').trim() : undefined,
      subjects,
      totalMarks,
      averageScore: Math.round(averageScore * 100) / 100,
      grade
    });
  }
  
  if (students.length === 0) {
    throw new Error('No valid student records found in the file');
  }
  
  return { students, schoolInfo };
};