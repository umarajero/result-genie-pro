import { Award, GraduationCap, Users, Medal, Sparkles, Star, Crown, Zap } from "lucide-react";
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

  const getDecorationElements = () => {
    if (!customization.decorations.showDecorations) return null;
    
    const elements = template.style.decorativeElements;
    
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Corner decorations */}
        {elements.includes('corner-flourishes') && (
          <>
            <div className="absolute top-4 left-4">
              <Sparkles className="w-8 h-8" style={{ color: customization.colors.accent }} />
            </div>
            <div className="absolute top-4 right-4">
              <Star className="w-8 h-8" style={{ color: customization.colors.accent }} />
            </div>
            <div className="absolute bottom-4 left-4">
              <Star className="w-8 h-8" style={{ color: customization.colors.accent }} />
            </div>
            <div className="absolute bottom-4 right-4">
              <Sparkles className="w-8 h-8" style={{ color: customization.colors.accent }} />
            </div>
          </>
        )}

        {/* Luxury elements */}
        {elements.includes('royal-crown') && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <Crown className="w-12 h-12" style={{ color: customization.colors.secondary }} />
          </div>
        )}

        {/* Tech elements */}
        {elements.includes('neon-glow') && (
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full border-2 rounded-lg animate-pulse" style={{ borderColor: customization.colors.accent }} />
          </div>
        )}

        {/* Playful elements */}
        {elements.includes('confetti') && (
          <>
            <div className="absolute top-16 left-16">
              <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: customization.colors.secondary }} />
            </div>
            <div className="absolute top-24 right-20">
              <div className="w-2 h-2 rounded-full animate-bounce animation-delay-300" style={{ backgroundColor: customization.colors.accent }} />
            </div>
            <div className="absolute bottom-20 left-24">
              <div className="w-4 h-4 rounded-full animate-bounce animation-delay-500" style={{ backgroundColor: customization.colors.primary }} />
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

  const getLayoutClasses = () => {
    const { headerLayout, contentAlignment, orientation, textOrientation } = template.layout;
    
    let classes = "max-w-4xl mx-auto bg-white shadow-certificate rounded-lg relative overflow-hidden ";
    
    if (orientation === 'landscape') {
      classes += "w-full max-w-6xl aspect-[4/3] ";
    }
    
    if (textOrientation === 'vertical') {
      classes += "writing-mode-vertical ";
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
        return { transform: 'rotate(-2deg)', transformOrigin: 'center' };
      default:
        return { textAlign: 'center' as const };
    }
  };

  const getContentAlignmentStyle = () => {
    const { contentAlignment } = template.layout;
    
    switch (contentAlignment) {
      case 'left':
        return { textAlign: 'left' as const };
      case 'right':
        return { textAlign: 'right' as const };
      case 'justify':
        return { textAlign: 'justify' as const };
      case 'scattered':
        return { textAlign: 'center' as const, transform: 'rotate(1deg)' };
      default:
        return { textAlign: 'center' as const };
    }
  };

  const getSignatureLayoutStyle = () => {
    const { signatureLayout } = template.layout;
    
    switch (signatureLayout) {
      case 'double':
        return { display: 'flex', justifyContent: 'space-between', gap: '4rem' };
      case 'triple':
        return { display: 'flex', justifyContent: 'space-around', gap: '2rem' };
      case 'corners':
        return { display: 'flex', justifyContent: 'space-between', position: 'absolute' as const, bottom: '2rem', left: '2rem', right: '2rem' };
      case 'bottom-spread':
        return { display: 'flex', justifyContent: 'space-evenly', width: '100%' };
      default:
        return { display: 'flex', justifyContent: 'center' };
    }
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
    fontWeight: template.style.fontWeights.title,
    marginBottom: template.style.spacing.sectionGaps
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

  const signatureStyle = {
    fontFamily: getFontFamily(customization.fonts.signature),
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
              <h1 style={titleStyle}>{schoolName}</h1>
              {schoolAddress && <p style={bodyStyle}>{schoolAddress}</p>}
            </div>
            {schoolLogo && (
              <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full overflow-hidden border-2" style={{ borderColor: customization.colors.primary }}>
                <img src={schoolLogo} alt={`${schoolName} Logo`} className="w-full h-full object-contain" />
              </div>
            )}
          </div>
        ) : (
          <div>
            {schoolLogo && template.layout.logoPosition === 'top' && (
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full overflow-hidden border-2" style={{ borderColor: customization.colors.primary }}>
                  <img src={schoolLogo} alt={`${schoolName} Logo`} className="w-full h-full object-contain" />
                </div>
              </div>
            )}
            <h1 style={titleStyle}>{schoolName}</h1>
            {schoolAddress && <p style={bodyStyle}>{schoolAddress}</p>}
          </div>
        )}
        
        <div className="p-4 rounded-lg mt-4" style={{ backgroundColor: `${customization.colors.primary}10` }}>
          <h2 style={{ ...titleStyle, fontSize: template.style.fontSize.subtitle, marginBottom: '0.5rem' }}>
            CERTIFICATE OF ACHIEVEMENT
          </h2>
          <p style={subtitleStyle}>{session} Academic Session - {term} Term</p>
        </div>
      </div>

      {/* Certificate Body */}
      <div 
        className="py-12 space-y-8 relative z-10" 
        style={{
          ...getContentAlignmentStyle(),
          paddingTop: template.style.spacing.sectionGaps,
          paddingBottom: template.style.spacing.sectionGaps
        }}
      >
        {/* Decorative elements */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Medal className="w-12 h-12" style={{ color: customization.colors.accent }} />
          <Award className="w-16 h-16" style={{ color: customization.colors.primary }} />
          <Medal className="w-12 h-12" style={{ color: customization.colors.accent }} />
        </div>

        <div className="space-y-6">
          <p style={{ ...bodyStyle, fontSize: template.style.fontSize.subtitle }}>
            This is to certify that
          </p>
          
          <div 
            className="border-2 rounded-lg p-6" 
            style={{ 
              backgroundColor: `${customization.colors.primary}05`,
              borderColor: customization.colors.primary,
              margin: template.style.spacing.margins
            }}
          >
            <h3 style={{ ...titleStyle, fontSize: template.style.fontSize.title, marginBottom: '0.5rem' }}>
              {studentName}
            </h3>
            <p style={{ ...bodyStyle, fontSize: template.style.fontSize.subtitle }}>
              Student of {className}
            </p>
          </div>

          <p 
            className="max-w-2xl mx-auto leading-relaxed" 
            style={{ 
              ...bodyStyle,
              lineHeight: '1.8',
              margin: template.style.spacing.margins
            }}
          >
            has successfully completed the <strong>{term}</strong> term of the <strong>{session}</strong> academic session 
            with distinction and outstanding performance.
          </p>

          {/* Achievement details */}
          <div 
            className="p-6 rounded-lg text-white space-y-4" 
            style={{ 
              backgroundColor: customization.colors.primary,
              margin: template.style.spacing.margins
            }}
          >
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div style={{ fontSize: template.style.fontSize.title, fontWeight: template.style.fontWeights.title }}>
                  {averageScore}%
                </div>
                <div className="text-white/90" style={{ fontSize: template.style.fontSize.body }}>
                  Average Score
                </div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div style={{ fontSize: template.style.fontSize.title, fontWeight: template.style.fontWeights.title }}>
                  {overallGrade}
                </div>
                <div className="text-white/90" style={{ fontSize: template.style.fontSize.body }}>
                  Grade
                </div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div style={{ fontSize: template.style.fontSize.title, fontWeight: template.style.fontWeights.title }}>
                  {position}
                </div>
                <div className="text-white/90" style={{ fontSize: template.style.fontSize.body }}>
                  Position
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Users className="w-5 h-5" />
              <span style={{ fontSize: template.style.fontSize.body }}>
                Out of {totalStudents} students in the class
              </span>
            </div>
          </div>

          <p style={{ ...bodyStyle, fontSize: template.style.fontSize.body }}>
            Awarded on this <strong>{dateIssued}</strong> in recognition of academic excellence and dedication to learning.
          </p>
        </div>
      </div>

      {/* Footer */}
      {(signatories?.classTeacher || signatories?.instructor) && (
        <div 
          className="flex justify-center pt-6 border-t-2 mt-8 relative z-10" 
          style={{ 
            borderColor: customization.colors.secondary,
            ...getSignatureLayoutStyle(),
            marginTop: template.style.spacing.sectionGaps
          }}
        >
          <div className="text-center max-w-sm">
            <div className="h-16 border-b mb-2" style={{ borderColor: customization.colors.text }}></div>
            <p style={{ ...signatureStyle, fontWeight: template.style.fontWeights.signature }}>
              {signatories?.classTeacher || signatories?.instructor}
            </p>
            <p style={{ ...bodyStyle, fontSize: template.style.fontSize.signature }}>
              {signatories?.classTeacher ? "Class Teacher" : "Instructor"} - Signature & Date
            </p>
          </div>
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