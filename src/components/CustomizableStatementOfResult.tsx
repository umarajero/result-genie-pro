import { Award, GraduationCap, Users, Calendar, Sparkles, Star } from "lucide-react";
import { StatementTemplate, StatementCustomization } from '@/types/statementTemplates';

interface CustomizableStatementOfResultProps {
  studentName: string;
  className: string;
  serialNumber?: string;
  regNumber?: string;
  session: string;
  term: string;
  position: string;
  totalStudents: number;
  schoolName: string;
  schoolAddress: string;
  schoolContact: string;
  schoolLogo?: string;
  subjects: Array<{
    name: string;
    score: number;
    grade: string;
  }>;
  dateIssued: string;
  signatories?: {
    classTeacher?: string;
    instructor?: string;
  };
  template: StatementTemplate;
  customization: StatementCustomization;
}

export const CustomizableStatementOfResult = ({
  studentName,
  className,
  serialNumber,
  regNumber,
  session,
  term,
  position,
  totalStudents,
  schoolName,
  schoolAddress,
  schoolContact,
  schoolLogo,
  subjects,
  dateIssued,
  signatories,
  template,
  customization
}: CustomizableStatementOfResultProps) => {
  
  const getFontFamily = (fontType: string) => {
    switch (fontType) {
      case 'serif': return 'Times New Roman, serif';
      case 'sans-serif': return 'Arial, sans-serif';
      case 'display': return 'Playfair Display, serif';
      case 'mono': return 'Courier New, monospace';
      case 'rounded': return 'Nunito, sans-serif';
      default: return 'Arial, sans-serif';
    }
  };

  const getBorderWidth = () => {
    switch (customization.decorations.borderWidth) {
      case 'thin': return '1px';
      case 'medium': return '2px';
      case 'thick': return '4px';
      case 'extra-thick': return '6px';
      default: return '2px';
    }
  };

  const getTableBorderWidth = () => {
    switch (customization.table.borderWidth) {
      case 'thin': return '1px';
      case 'medium': return '2px';
      case 'thick': return '3px';
      default: return '2px';
    }
  };

  const getDecorationElements = () => {
    if (!customization.decorations.showDecorations) return null;
    
    const elements = template.style.decorativeElements;
    
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Corner decorations */}
        {elements.includes('academic-border') && (
          <>
            <div className="absolute top-4 left-4">
              <Sparkles className="w-6 h-6" style={{ color: customization.colors.accent }} />
            </div>
            <div className="absolute top-4 right-4">
              <Star className="w-6 h-6" style={{ color: customization.colors.accent }} />
            </div>
            <div className="absolute bottom-4 left-4">
              <Star className="w-6 h-6" style={{ color: customization.colors.accent }} />
            </div>
            <div className="absolute bottom-4 right-4">
              <Sparkles className="w-6 h-6" style={{ color: customization.colors.accent }} />
            </div>
          </>
        )}
        
        {/* Watermark */}
        {customization.decorations.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <GraduationCap className="w-64 h-64" style={{ color: customization.colors.primary }} />
          </div>
        )}
      </div>
    );
  };

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

  const containerStyle = {
    backgroundColor: customization.colors.background,
    fontFamily: getFontFamily(customization.fonts.body),
    border: customization.decorations.showBorder 
      ? `${getBorderWidth()} solid ${customization.colors.primary}`
      : 'none',
    position: 'relative' as const,
    overflow: 'hidden' as const
  };

  const headerStyle = {
    fontFamily: getFontFamily(customization.fonts.heading),
    color: customization.colors.primary
  };

  const textStyle = {
    color: customization.colors.text
  };

  const tableStyle = {
    fontFamily: getFontFamily(customization.fonts.table),
    border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none'
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-certificate rounded-lg" style={containerStyle}>
      {getDecorationElements()}
      
      {/* Header */}
      <div className="text-center mb-8 border-b-2 pb-6 relative z-10" style={{ borderColor: customization.colors.secondary }}>
        <div className="flex items-center justify-center gap-6 mb-4">
          {schoolLogo ? (
            <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full overflow-hidden border-2" style={{ borderColor: customization.colors.primary }}>
              <img 
                src={schoolLogo} 
                alt={`${schoolName} Logo`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden p-3 rounded-full" style={{ backgroundColor: customization.colors.primary }}>
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
          ) : (
            <div className="w-20 h-20 p-4 rounded-full flex items-center justify-center" style={{ backgroundColor: customization.colors.primary }}>
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          )}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2" style={headerStyle}>{schoolName}</h1>
            {schoolAddress && <p className="text-lg" style={textStyle}>{schoolAddress}</p>}
            {schoolContact && <p style={textStyle}>{schoolContact}</p>}
          </div>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: `${customization.colors.primary}10` }}>
          <h2 className="text-2xl font-bold mb-2" style={headerStyle}>STATEMENT OF RESULT</h2>
          <p className="font-medium" style={{ color: customization.colors.accent }}>{session} Academic Session - {term} Term</p>
        </div>
      </div>

      {/* Student Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold min-w-[120px]" style={textStyle}>Student Name:</span>
            <span className="font-bold text-lg" style={{ color: customization.colors.primary }}>{studentName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold min-w-[120px]" style={textStyle}>Class:</span>
            <span style={textStyle}>{className}</span>
          </div>
        </div>
        <div className="space-y-3">
          {regNumber && (
            <div className="flex items-center gap-3">
              <span className="font-semibold min-w-[120px]" style={textStyle}>REG No:</span>
              <span style={textStyle}>{regNumber}</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="font-semibold min-w-[120px]" style={textStyle}>Position:</span>
            <span className="font-bold" style={{ color: customization.colors.accent }}>{position} out of {totalStudents}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4" style={{ color: customization.colors.primary }} />
            <span className="font-semibold min-w-[100px]" style={textStyle}>Date Issued:</span>
            <span style={textStyle}>{dateIssued}</span>
          </div>
        </div>
      </div>

      {/* Subject Results Table */}
      <div className="mb-8 relative z-10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={textStyle}>
          <Award className="w-5 h-5" style={{ color: customization.colors.primary }} />
          Academic Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg" style={tableStyle}>
            <thead>
              <tr style={{ 
                backgroundColor: customization.table.headerStyle === 'colored' ? customization.colors.tableHeader : 'transparent'
              }}>
                <th 
                  className="p-3 text-left"
                  style={{ 
                    fontWeight: customization.table.headerStyle === 'bold' ? 'bold' : 'normal',
                    color: customization.colors.text,
                    border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none'
                  }}
                >
                  Subject
                </th>
                <th 
                  className="p-3 text-center"
                  style={{ 
                    fontWeight: customization.table.headerStyle === 'bold' ? 'bold' : 'normal',
                    color: customization.colors.text,
                    border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none'
                  }}
                >
                  Score
                </th>
                <th 
                  className="p-3 text-center"
                  style={{ 
                    fontWeight: customization.table.headerStyle === 'bold' ? 'bold' : 'normal',
                    color: customization.colors.text,
                    border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none'
                  }}
                >
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr 
                  key={index} 
                  style={{ 
                    backgroundColor: customization.table.alternateRows && index % 2 === 1 
                      ? `${customization.colors.tableHeader}50` 
                      : 'transparent'
                  }}
                >
                  <td 
                    className="p-3"
                    style={{ 
                      color: customization.colors.text,
                      border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none'
                    }}
                  >
                    {subject.name}
                  </td>
                  <td 
                    className="p-3 text-center font-medium"
                    style={{ 
                      color: customization.colors.text,
                      border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none'
                    }}
                  >
                    {subject.score}%
                  </td>
                  <td 
                    className="p-3 text-center"
                    style={{ 
                      border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none'
                    }}
                  >
                    <span className={`font-bold px-3 py-1 rounded-full ${
                      subject.grade === 'A' ? 'bg-green-100 text-green-800' :
                      subject.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                      subject.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      subject.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {subject.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-lg text-center text-white" style={{ backgroundColor: customization.colors.accent }}>
          <div className="text-2xl font-bold">{totalMarks}</div>
          <div className="text-white/90 font-medium">Total Marks</div>
        </div>
        <div className="p-4 rounded-lg text-center text-white" style={{ backgroundColor: customization.colors.primary }}>
          <div className="text-2xl font-bold">{averageScore}%</div>
          <div className="text-white/90 font-medium">Average Score</div>
        </div>
        <div className="p-4 rounded-lg text-center text-white" style={{ backgroundColor: customization.colors.secondary }}>
          <div className="text-2xl font-bold text-secondary-foreground">{getGradeFromAverage(averageScore)}</div>
          <div className="text-secondary-foreground/90 font-medium">Overall Grade</div>
        </div>
      </div>

      {/* Footer */}
      {(signatories?.classTeacher || signatories?.instructor) && (
        <div className="flex justify-center pt-6 border-t-2 relative z-10" style={{ borderColor: customization.colors.secondary }}>
          <div className="text-center max-w-sm">
            <div className="h-16 border-b mb-2" style={{ borderColor: customization.colors.text }}></div>
            <p className="font-semibold" style={textStyle}>
              {signatories?.classTeacher || signatories?.instructor}
            </p>
            <p className="text-sm" style={textStyle}>
              {signatories?.classTeacher ? "Class Teacher" : "Instructor"} - Signature & Date
            </p>
          </div>
        </div>
      )}

      {/* Generated by footer */}
      <div className="text-center mt-6 pt-4 border-t relative z-10" style={{ borderColor: `${customization.colors.primary}20` }}>
        <p className="text-sm" style={textStyle}>
          Generated by <span className="font-semibold" style={{ color: customization.colors.accent }}>Graderly</span> - 
          Modern School Result Management System
        </p>
      </div>
    </div>
  );
};