import { Award, GraduationCap, Users, Calendar, Sparkles, Star, Zap, Target } from "lucide-react";
import { StatementTemplate, StatementCustomization } from '@/types/statementTemplates';

interface CustomizableStatementOfResultProps {
  studentName: string;
  className: string;
  serialNumber?: string;
  regNumber?: string;
  session?: string;
  term?: string;
  position: string;
  totalStudents: number;
  schoolName?: string;
  schoolAddress?: string;
  schoolContact?: string;
  schoolLogo?: string;
  subjects: Array<{
    name: string;
    score: number;
    grade: string;
  }>;
  dateIssued?: string;
  resultRemark?: string;
  signatories?: {
    classTeacher?: string;
    headTeacher?: string;
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
  resultRemark,
  signatories,
  template,
  customization
}: CustomizableStatementOfResultProps) => {
  
  const getFontFamily = (fontType: string) => {
    switch (fontType) {
      case 'serif': return 'Times New Roman, serif';
      case 'sans-serif': return 'Arial, Helvetica, sans-serif';
      case 'display': return 'Playfair Display, serif';
      case 'mono': return 'Courier New, monospace';
      case 'rounded': return 'Nunito, sans-serif';
      case 'script': return 'Dancing Script, cursive';
      case 'elegant': return 'Cormorant Garamond, serif';
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
        {/* Academic border elements */}
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

        {/* Modern geometric elements */}
        {elements.includes('geometric-lines') && (
          <>
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: customization.colors.primary }} />
            <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: customization.colors.accent }} />
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: customization.colors.secondary }} />
            <div className="absolute top-0 right-0 w-1 h-full" style={{ backgroundColor: customization.colors.secondary }} />
          </>
        )}

        {/* Luxury gold accents */}
        {elements.includes('gold-accents') && (
          <>
            <div className="absolute top-8 left-8 w-16 h-16 border-4 rounded-full" style={{ borderColor: customization.colors.secondary }} />
            <div className="absolute top-8 right-8 w-16 h-16 border-4 rounded-full" style={{ borderColor: customization.colors.secondary }} />
          </>
        )}

        {/* Tech grid pattern */}
        {elements.includes('tech-grid') && (
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(${customization.colors.accent} 1px, transparent 1px), linear-gradient(90deg, ${customization.colors.accent} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
          </div>
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

  const getLayoutClasses = () => {
    const { orientation } = template.layout;
    
    let classes = "max-w-4xl mx-auto bg-white shadow-certificate rounded-lg relative overflow-hidden ";
    
    if (orientation === 'landscape') {
      classes += "w-full max-w-6xl aspect-[4/3] ";
    }
    
    return classes;
  };

  const getHeaderLayoutStyle = () => {
    const { headerLayout } = template.layout;
    
    switch (headerLayout) {
      case 'left':
        return { textAlign: 'left' as const };
      case 'right':
        return { textAlign: 'right' as const };
      case 'split':
        return { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
      case 'vertical':
        return { display: 'flex', flexDirection: 'column' as const, alignItems: 'center' };
      case 'diagonal':
        return { transform: 'rotate(-1deg)', transformOrigin: 'center' };
      default:
        return { textAlign: 'center' as const };
    }
  };

  const getTableLayoutStyle = () => {
    const { tableLayout } = template.layout;
    
    switch (tableLayout) {
      case 'modern':
        return { borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
      case 'compact':
        return { fontSize: '0.875rem', lineHeight: '1.2' };
      case 'detailed':
        return { fontSize: '1rem', lineHeight: '1.6', padding: '1rem' };
      case 'minimal':
        return { border: 'none', fontSize: '0.9rem' };
      case 'wide':
        return { width: '100%', fontSize: '1.1rem', letterSpacing: '0.5px' };
      default:
        return {};
    }
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
    padding: template.style.spacing.padding,
    margin: template.style.spacing.margins,
    fontSize: template.style.fontSize.body,
    fontWeight: template.style.fontWeights.body,
    position: 'relative' as const,
    overflow: 'hidden' as const
  };

  const titleStyle = {
    fontFamily: getFontFamily(customization.fonts.heading),
    color: customization.colors.primary,
    fontSize: template.style.fontSize.title,
    fontWeight: template.style.fontWeights.title
  };

  const subtitleStyle = {
    color: customization.colors.secondary,
    fontSize: template.style.fontSize.subtitle,
    fontWeight: template.style.fontWeights.subtitle
  };

  const bodyStyle = {
    color: customization.colors.text,
    fontSize: template.style.fontSize.body,
    fontWeight: template.style.fontWeights.body
  };

  const tableStyle = {
    fontFamily: getFontFamily(customization.fonts.table),
    fontSize: template.style.fontSize.table,
    fontWeight: template.style.fontWeights.table,
    border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none',
    ...getTableLayoutStyle()
  };

  const signatureStyle = {
    fontFamily: getFontFamily(customization.fonts.heading),
    color: customization.colors.text,
    fontSize: template.style.fontSize.signature,
    fontWeight: template.style.fontWeights.signature
  };

  return (
    <div className={getLayoutClasses()} style={containerStyle}>
      {getDecorationElements()}
      
      {/* Header */}
      <div 
        className="mb-8 border-b-2 pb-6 relative z-10" 
        style={{ 
          borderColor: customization.colors.secondary,
          ...getHeaderLayoutStyle(),
          marginBottom: template.style.spacing.sectionGaps
        }}
      >
        {template.layout.headerLayout === 'split' ? (
          <div className="flex justify-between items-center">
            <div>
              <h1 style={titleStyle}>{schoolName || "—"}</h1>
              {schoolAddress && <p style={bodyStyle}>{schoolAddress}</p>}
            </div>
            {schoolLogo && (
              <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full overflow-hidden border-2" style={{ borderColor: customization.colors.primary }}>
                <img src={schoolLogo} alt={`${schoolName || "School"} Logo`} className="w-full h-full object-contain" />
              </div>
            )}
          </div>
        ) : (
          <div>
            {schoolLogo && template.layout.logoPosition === 'top' && (
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full overflow-hidden border-2" style={{ borderColor: customization.colors.primary }}>
                  <img src={schoolLogo} alt={`${schoolName || "School"} Logo`} className="w-full h-full object-contain" />
                </div>
              </div>
            )}
            <h1 style={titleStyle}>{schoolName || "—"}</h1>
            {schoolAddress && <p style={bodyStyle}>{schoolAddress}</p>}
          </div>
        )}
        
        <div className="p-4 rounded-lg mt-4" style={{ backgroundColor: `${customization.colors.primary}10` }}>
          <h2 style={{ ...titleStyle, fontSize: template.style.fontSize.subtitle, marginBottom: '0.5rem' }}>
            STATEMENT OF RESULT
          </h2>
          {(session || term) && (
            <p style={subtitleStyle}>
              {session && `${session} Academic Session`}
              {session && term && " - "}
              {term && `${term}`}
            </p>
          )}
        </div>
      </div>

      {/* Student Information */}
      <div 
        className="grid md:grid-cols-2 gap-6 mb-8 relative z-10"
        style={{ marginBottom: template.style.spacing.sectionGaps }}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold min-w-[120px]" style={{ ...bodyStyle, fontWeight: template.style.fontWeights.body }}>
              Student Name:
            </span>
            <span style={{ ...titleStyle, fontSize: template.style.fontSize.subtitle }}>{studentName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold min-w-[120px]" style={{ ...bodyStyle, fontWeight: template.style.fontWeights.body }}>
              Class:
            </span>
            <span style={bodyStyle}>{className}</span>
          </div>
        </div>
        <div className="space-y-3">
          {regNumber && (
            <div className="flex items-center gap-3">
              <span className="font-semibold min-w-[120px]" style={{ ...bodyStyle, fontWeight: template.style.fontWeights.body }}>
                REG No:
              </span>
              <span style={bodyStyle}>{regNumber}</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="font-semibold min-w-[120px]" style={{ ...bodyStyle, fontWeight: template.style.fontWeights.body }}>
              Position:
            </span>
            <span style={{ ...bodyStyle, color: customization.colors.accent, fontWeight: template.style.fontWeights.subtitle }}>
              {position} out of {totalStudents}
            </span>
          </div>
          {dateIssued && (
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4" style={{ color: customization.colors.primary }} />
              <span className="font-semibold min-w-[100px]" style={{ ...bodyStyle, fontWeight: template.style.fontWeights.body }}>
                Date Issued:
              </span>
              <span style={bodyStyle}>{dateIssued}</span>
            </div>
          )}
        </div>
      </div>

      {/* Subject Results Table */}
      <div 
        className="mb-8 relative z-10"
        style={{ marginBottom: template.style.spacing.sectionGaps }}
      >
        <h3 
          className="mb-4 flex items-center gap-2" 
          style={{ 
            ...titleStyle, 
            fontSize: template.style.fontSize.subtitle,
            marginBottom: template.style.spacing.tableSpacing
          }}
        >
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
                    fontWeight: customization.table.headerStyle === 'bold' ? '700' : template.style.fontWeights.table,
                    color: customization.colors.text,
                    border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none',
                    fontSize: template.style.fontSize.table,
                    padding: template.style.spacing.tableSpacing
                  }}
                >
                  Subject
                </th>
                <th 
                  className="p-3 text-center"
                  style={{ 
                    fontWeight: customization.table.headerStyle === 'bold' ? '700' : template.style.fontWeights.table,
                    color: customization.colors.text,
                    border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none',
                    fontSize: template.style.fontSize.table,
                    padding: template.style.spacing.tableSpacing
                  }}
                >
                  Score
                </th>
                <th 
                  className="p-3 text-center"
                  style={{ 
                    fontWeight: customization.table.headerStyle === 'bold' ? '700' : template.style.fontWeights.table,
                    color: customization.colors.text,
                    border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none',
                    fontSize: template.style.fontSize.table,
                    padding: template.style.spacing.tableSpacing
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
                      border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none',
                      fontSize: template.style.fontSize.table,
                      fontWeight: template.style.fontWeights.table,
                      padding: template.style.spacing.tableSpacing
                    }}
                  >
                    {subject.name}
                  </td>
                  <td 
                    className="p-3 text-center"
                    style={{ 
                      color: customization.colors.text,
                      border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none',
                      fontSize: template.style.fontSize.table,
                      fontWeight: template.style.fontWeights.table,
                      padding: template.style.spacing.tableSpacing
                    }}
                  >
                    {subject.score}%
                  </td>
                  <td 
                    className="p-3 text-center"
                    style={{ 
                      border: customization.table.showBorders ? `${getTableBorderWidth()} solid ${customization.colors.tableBorder}` : 'none',
                      padding: template.style.spacing.tableSpacing
                    }}
                  >
                    <span className={`font-bold px-3 py-1 rounded-full ${
                      subject.grade === 'A' ? 'bg-green-100 text-green-800' :
                      subject.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                      subject.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      subject.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`} style={{ fontSize: template.style.fontSize.table }}>
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
      <div 
        className="grid md:grid-cols-3 gap-4 mb-8 relative z-10"
        style={{ marginBottom: template.style.spacing.sectionGaps }}
      >
        <div className="p-4 rounded-lg text-center text-white" style={{ backgroundColor: customization.colors.accent }}>
          <div style={{ fontSize: template.style.fontSize.subtitle, fontWeight: template.style.fontWeights.subtitle }}>
            {totalMarks}
          </div>
          <div className="text-white/90" style={{ fontSize: template.style.fontSize.body }}>Total Marks</div>
        </div>
        <div className="p-4 rounded-lg text-center text-white" style={{ backgroundColor: customization.colors.primary }}>
          <div style={{ fontSize: template.style.fontSize.subtitle, fontWeight: template.style.fontWeights.subtitle }}>
            {averageScore}%
          </div>
          <div className="text-white/90" style={{ fontSize: template.style.fontSize.body }}>Average Score</div>
        </div>
        <div className="p-4 rounded-lg text-center" style={{ backgroundColor: customization.colors.secondary }}>
          <div style={{ 
            fontSize: template.style.fontSize.subtitle, 
            fontWeight: template.style.fontWeights.subtitle,
            color: customization.colors.text
          }}>
            {getGradeFromAverage(averageScore)}
          </div>
          <div style={{ fontSize: template.style.fontSize.body, color: customization.colors.text }}>Overall Grade</div>
        </div>
      </div>

      {/* Result Remark */}
      {resultRemark && (
        <div 
          className="p-4 rounded-lg border mb-8 relative z-10" 
          style={{ 
            backgroundColor: `${customization.colors.accent}10`,
            borderColor: `${customization.colors.accent}20`,
            marginBottom: template.style.spacing.sectionGaps
          }}
        >
          <p style={{ ...bodyStyle, textAlign: 'center' }}>
            <strong>Remark:</strong> {resultRemark}
          </p>
        </div>
      )}

      {/* Footer */}
      {(signatories?.classTeacher || signatories?.headTeacher) && (
        <div 
          className="flex justify-center gap-8 pt-6 border-t-2 relative z-10" 
          style={{ 
            borderColor: customization.colors.secondary,
            marginTop: template.style.spacing.sectionGaps
          }}
        >
          {signatories?.classTeacher && (
            <div className="text-center max-w-sm">
              <div className="h-16 border-b mb-2" style={{ borderColor: customization.colors.text }}></div>
              <p style={signatureStyle}>
                {signatories.classTeacher}
              </p>
              <p style={{ ...bodyStyle, fontSize: template.style.fontSize.signature }}>
                Class Teacher - Signature & Date
              </p>
            </div>
          )}
          {signatories?.headTeacher && (
            <div className="text-center max-w-sm">
              <div className="h-16 border-b mb-2" style={{ borderColor: customization.colors.text }}></div>
              <p style={signatureStyle}>
                {signatories.headTeacher}
              </p>
              <p style={{ ...bodyStyle, fontSize: template.style.fontSize.signature }}>
                Head Teacher - Signature & Date
              </p>
            </div>
          )}
        </div>
      )}

      {/* Generated by footer */}
      <div 
        className="text-center mt-6 pt-4 border-t relative z-10" 
        style={{ 
          borderColor: `${customization.colors.primary}20`,
          marginTop: template.style.spacing.sectionGaps
        }}
      >
        <p style={{ ...bodyStyle, fontSize: template.style.fontSize.signature }}>
          Generated by <span className="font-semibold" style={{ color: customization.colors.accent }}>ResultGenie</span> - 
          Modern School Result Management System
        </p>
      </div>
    </div>
  );
};