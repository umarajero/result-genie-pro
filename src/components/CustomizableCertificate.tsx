import { Award, GraduationCap, Users, Medal, Sparkles, Star } from "lucide-react";
import { CertificateTemplate, TemplateCustomization } from '@/types/certificateTemplates';

interface CustomizableCertificateProps {
  studentName: string;
  className: string;
  session: string;
  term: string;
  position: string;
  totalStudents: number;
  schoolName: string;
  schoolAddress: string;
  schoolContact: string;
  schoolLogo?: string;
  averageScore: number;
  overallGrade: string;
  dateIssued: string;
  signatories?: {
    classTeacher?: string;
    instructor?: string;
  };
  template: CertificateTemplate;
  customization: TemplateCustomization;
}

export const CustomizableCertificate = ({
  studentName,
  className,
  session,
  term,
  position,
  totalStudents,
  schoolName,
  schoolAddress,
  schoolContact,
  schoolLogo,
  averageScore,
  overallGrade,
  dateIssued,
  signatories,
  template,
  customization
}: CustomizableCertificateProps) => {
  
  const getFontFamily = (fontType: string) => {
    switch (fontType) {
      case 'serif': return 'Times New Roman, serif';
      case 'sans-serif': return 'Arial, sans-serif';
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

  const getDecorationElements = () => {
    if (!customization.decorations.showDecorations) return null;
    
    const elements = template.style.decorativeElements;
    
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Corner decorations */}
        {elements.includes('corner-flourishes') && (
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
        
        {/* Background pattern */}
        {elements.includes('geometric-shapes') && (
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, ${customization.colors.primary} 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
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

  const accentStyle = {
    color: customization.colors.accent
  };

  const secondaryStyle = {
    color: customization.colors.secondary
  };

  const textStyle = {
    color: customization.colors.text
  };

  const signatureStyle = {
    fontFamily: getFontFamily(customization.fonts.signature),
    color: customization.colors.text
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
          <h2 className="text-2xl font-bold mb-2" style={headerStyle}>CERTIFICATE OF ACHIEVEMENT</h2>
          <p className="font-medium" style={accentStyle}>{session} Academic Session - {term} Term</p>
        </div>
      </div>

      {/* Certificate Body */}
      <div className="text-center py-12 space-y-8 relative z-10">
        {/* Decorative elements */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Medal className="w-12 h-12" style={accentStyle} />
          <Award className="w-16 h-16" style={headerStyle} />
          <Medal className="w-12 h-12" style={accentStyle} />
        </div>

        <div className="space-y-6">
          <p className="text-xl" style={textStyle}>This is to certify that</p>
          
          <div className="border-2 rounded-lg p-6" style={{ 
            backgroundColor: `${customization.colors.primary}05`,
            borderColor: customization.colors.primary
          }}>
            <h3 className="text-4xl font-bold mb-2" style={headerStyle}>{studentName}</h3>
            <p className="text-lg" style={textStyle}>Student of {className}</p>
          </div>

          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={textStyle}>
            has successfully completed the <strong>{term}</strong> term of the <strong>{session}</strong> academic session 
            with distinction and outstanding performance.
          </p>

          {/* Achievement details */}
          <div className="p-6 rounded-lg text-white space-y-4" style={{ backgroundColor: customization.colors.primary }}>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{averageScore}%</div>
                <div className="text-white/90">Average Score</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold">{overallGrade}</div>
                <div className="text-white/90">Grade</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold">{position}</div>
                <div className="text-white/90">Position</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Users className="w-5 h-5" />
              <span>Out of {totalStudents} students in the class</span>
            </div>
          </div>

          <p className="text-base" style={textStyle}>
            Awarded on this <strong>{dateIssued}</strong> in recognition of academic excellence and dedication to learning.
          </p>
        </div>
      </div>

      {/* Footer */}
      {(signatories?.classTeacher || signatories?.instructor) && (
        <div className="flex justify-center pt-6 border-t-2 mt-8 relative z-10" style={{ borderColor: customization.colors.secondary }}>
          <div className="text-center max-w-sm">
            <div className="h-16 border-b mb-2" style={{ borderColor: customization.colors.text }}></div>
            <p className="font-semibold" style={signatureStyle}>
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
          Generated by <span className="font-semibold" style={accentStyle}>Graderly</span> - 
          Modern School Result Management System
        </p>
      </div>
    </div>
  );
};