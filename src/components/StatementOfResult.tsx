import { Award, GraduationCap, Calendar, Users } from "lucide-react";

interface StatementOfResultProps {
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
  resultRemark?: string;
  signatories?: {
    classTeacher?: string;
    headTeacher?: string;
  };
}

export const StatementOfResult = ({
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
  signatories
}: StatementOfResultProps) => {
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
          <h2 className="text-2xl font-bold text-foreground mb-2">STATEMENT OF RESULT</h2>
          <p className="text-primary font-medium">{session} Academic Session - {term} Term</p>
        </div>
      </div>

      {/* Student Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-foreground min-w-[120px]">Student Name:</span>
            <span className="text-primary font-bold text-lg">{studentName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-foreground min-w-[120px]">Class:</span>
            <span className="text-foreground">{className}</span>
          </div>
        </div>
        <div className="space-y-3">
          {regNumber && (
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground min-w-[120px]">REG No:</span>
              <span className="text-foreground">{regNumber}</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-foreground min-w-[120px]">Position:</span>
            <span className="text-accent font-bold">{position} out of {totalStudents}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground min-w-[100px]">Date Issued:</span>
            <span className="text-foreground">{dateIssued}</span>
          </div>
        </div>
      </div>

      {/* Subject Results Table */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Academic Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-gradient-subtle">
                <th className="border border-border p-3 text-left font-semibold text-foreground">Subject</th>
                <th className="border border-border p-3 text-center font-semibold text-foreground">Score</th>
                <th className="border border-border p-3 text-center font-semibold text-foreground">Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className="hover:bg-muted/50">
                  <td className="border border-border p-3 text-foreground">{subject.name}</td>
                  <td className="border border-border p-3 text-center font-medium text-foreground">{subject.score}%</td>
                  <td className="border border-border p-3 text-center">
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
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-success p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{totalMarks}</div>
          <div className="text-white/90 font-medium">Total Marks</div>
        </div>
        <div className="bg-gradient-primary p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{averageScore}%</div>
          <div className="text-white/90 font-medium">Average Score</div>
        </div>
        <div className="bg-gradient-accent p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{getGradeFromAverage(averageScore)}</div>
          <div className="text-white/90 font-medium">Overall Grade</div>
        </div>
      </div>

      {/* Result Remark */}
      {resultRemark && (
        <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 mb-8">
          <p className="text-foreground text-center">
            <strong>Remark:</strong> {resultRemark}
          </p>
        </div>
      )}

      {/* Footer */}
      {(signatories?.classTeacher || signatories?.headTeacher) && (
        <div className="flex justify-center gap-8 pt-6 border-t-2 border-secondary">
          {signatories?.classTeacher && (
            <div className="text-center max-w-sm">
              <div className="h-16 border-b border-muted-foreground mb-2"></div>
              <p className="font-semibold text-foreground">
                {signatories.classTeacher}
              </p>
              <p className="text-muted-foreground text-sm">
                Class Teacher - Signature & Date
              </p>
            </div>
          )}
          {signatories?.headTeacher && (
            <div className="text-center max-w-sm">
              <div className="h-16 border-b border-muted-foreground mb-2"></div>
              <p className="font-semibold text-foreground">
                {signatories.headTeacher}
              </p>
              <p className="text-muted-foreground text-sm">
                Head Teacher - Signature & Date
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