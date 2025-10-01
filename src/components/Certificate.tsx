import { Award, GraduationCap, Users, Medal } from "lucide-react";

interface CertificateProps {
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
  resultRemark?: string;
  signatories?: {
    classTeacher?: string;
    headTeacher?: string;
    instructor?: string;
    headOfInstitution?: string;
  };
}

export const Certificate = ({
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
  resultRemark,
  signatories
}: CertificateProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-certificate rounded-lg border-2 border-primary">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-secondary pb-6">
        <div className="flex items-center justify-center gap-6 mb-4">
          {schoolLogo ? (
            <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full overflow-hidden border-2 border-primary">
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
              <div className="hidden p-3 bg-gradient-primary rounded-full">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
          ) : (
            <div className="w-20 h-20 p-4 bg-gradient-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          )}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">{schoolName}</h1>
            {schoolAddress && <p className="text-muted-foreground text-lg">{schoolAddress}</p>}
            {schoolContact && <p className="text-muted-foreground">{schoolContact}</p>}
          </div>
        </div>
        <div className="bg-gradient-subtle p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-2">CERTIFICATE OF ACHIEVEMENT</h2>
          <p className="text-primary font-medium">{session} Academic Session - {term} Term</p>
        </div>
      </div>

      {/* Certificate Body */}
      <div className="text-center py-12 space-y-8">
        {/* Decorative elements */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Medal className="w-12 h-12 text-accent" />
          <Award className="w-16 h-16 text-primary" />
          <Medal className="w-12 h-12 text-accent" />
        </div>

        <div className="space-y-6">
          <p className="text-xl text-foreground">This is to certify that</p>
          
          <div className="border-2 border-primary rounded-lg p-6 bg-gradient-subtle">
            <h3 className="text-4xl font-bold text-primary mb-2">{studentName}</h3>
            <p className="text-lg text-muted-foreground">Student of {className}</p>
          </div>

          <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
            has successfully completed the <strong>{term}</strong> term of the <strong>{session}</strong> academic session 
            with distinction and outstanding performance.
          </p>

          {/* Achievement details */}
          <div className="bg-gradient-hero p-6 rounded-lg text-white space-y-4">
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

          <p className="text-base text-muted-foreground">
            Awarded on this <strong>{dateIssued}</strong> in recognition of academic excellence and dedication to learning.
          </p>

          {/* Result Remark */}
          {resultRemark && (
            <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 mt-4">
              <p className="text-foreground text-center italic">
                <strong>Remark:</strong> {resultRemark}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {(signatories?.classTeacher || signatories?.headTeacher || signatories?.instructor || signatories?.headOfInstitution) && (
        <div className="flex justify-center gap-8 pt-6 border-t-2 border-secondary mt-8">
          {(signatories?.classTeacher || signatories?.instructor) && (
            <div className="text-center max-w-sm">
              <div className="h-16 border-b border-muted-foreground mb-2"></div>
              <p className="font-semibold text-foreground">
                {signatories?.classTeacher || signatories?.instructor}
              </p>
              <p className="text-muted-foreground text-sm">
                {signatories?.classTeacher ? "Class Teacher" : "Instructor"} - Signature & Date
              </p>
            </div>
          )}
          {(signatories?.headTeacher || signatories?.headOfInstitution) && (
            <div className="text-center max-w-sm">
              <div className="h-16 border-b border-muted-foreground mb-2"></div>
              <p className="font-semibold text-foreground">
                {signatories?.headTeacher || signatories?.headOfInstitution}
              </p>
              <p className="text-muted-foreground text-sm">
                {signatories?.headTeacher ? "Head Teacher" : "Head of Institution"} - Signature & Date
              </p>
            </div>
          )}
        </div>
      )}

      {/* Generated by footer */}
      <div className="text-center mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Generated by <span className="font-semibold text-primary">ResultGenie</span> - 
          Modern School Result Management System
        </p>
      </div>
    </div>
  );
};