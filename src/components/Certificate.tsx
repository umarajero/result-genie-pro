import { GraduationCap, Users } from "lucide-react";
import React from "react";

interface UploadedResult {
  averageScore?: number;
  percentage?: number;
  studentName?: string;
  name?: string;
  fullName?: string;
  [key: string]: any;
}

interface CertificateProps {
  studentName: string;
  className?: string;
  institutionName?: string;
  session?: string;
  term?: string;
  position?: string;
  totalStudents?: number;
  schoolName?: string;
  schoolAddress?: string;
  schoolContact?: string;
  schoolLogo?: string;
  averageScore?: number;
  overallGrade?: string;
  dateIssued?: string;
  uploadedResults?: Array<number | UploadedResult>;
  students?: Array<any>;
  signatories?: {
    classTeacher?: string;
    headTeacher?: string;
    instructor?: string;
    headOfInstitution?: string;
  };
}

const getNumericPercent = (item?: number | UploadedResult): number | undefined => {
  if (item == null) return undefined;
  if (typeof item === "number") return Number.isFinite(item) ? item : undefined;
  const candidates = [
    "percentage",
    "percent",
    "averageScore",
    "scorePercent",
    "percentScore",
    "totalPercentage",
  ];
  for (const k of candidates) {
    const v = (item as any)[k];
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && v.trim() !== "") {
      const n = parseFloat(v);
      if (!Number.isNaN(n)) return n;
    }
  }
  // fallback: try to compute from marks if present
  const total = (item as any).total ?? (item as any).marksObtained ?? (item as any).score;
  const max = (item as any).max ?? (item as any).maxScore ?? (item as any).totalPossible;
  if (typeof total === "number" && typeof max === "number" && max > 0) {
    return (total / max) * 100;
  }
  return undefined;
};

const getStudentNameFromRecord = (item: any): string | undefined => {
  if (!item || typeof item !== "object") return undefined;
  const candidateKeys = [
    "studentName",
    "student",
    "name",
    "fullName",
    "fullname",
    "firstName",
    "lastName",
  ];
  for (const k of candidateKeys) {
    const v = item[k];
    if (typeof v === "string" && v.trim() !== "") return v.trim();
  }
  return undefined;
};

export const Certificate: React.FC<CertificateProps> = ({
  studentName,
  className,
  institutionName,
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
  uploadedResults,
  students,
  signatories,
}) => {
  // Derive remark from grade
  const gradeKey = (overallGrade || "").toString().trim().toUpperCase();
  let resultRemarkDerived: string | undefined;
  if (gradeKey === "A") resultRemarkDerived = "Distinction";
  else if (gradeKey === "B" || gradeKey === "C") resultRemarkDerived = "Credit";
  else if (gradeKey === "D" || gradeKey === "E") resultRemarkDerived = "Pass";
  else resultRemarkDerived = undefined;

  // If overall grade is F, show fallback message and don't render certificate
  if (gradeKey === "F") {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-center text-red-600 font-semibold">
          No certificate generated because the overall grade is F.
        </p>
      </div>
    );
  }

  // calculate current percent
  const currentPercent = typeof averageScore === "number" ? averageScore : getNumericPercent({ averageScore });

  // collect percentages from uploaded results
  const allPercents = (uploadedResults ?? [])
    .map(getNumericPercent)
    .filter((p): p is number => typeof p === "number" && Number.isFinite(p));

  // include current student's percent if not present
  const includeCurrent = typeof currentPercent === "number" && !allPercents.includes(currentPercent);
  const rankingPercents = includeCurrent ? [...allPercents, currentPercent] : allPercents;
  // Determine ranking using the `students` prop (preferred) or fall back to uploaded results
  // Build percent list from students array
  const studentEntries = (students ?? []).map((s) => ({
    raw: s,
    percent: getNumericPercent(s) as number | undefined,
  }));

  const validStudentPercents = studentEntries.filter((e) => typeof e.percent === "number") as Array<{
    raw: any;
    percent: number;
  }>;

  // Build ranking map (standard competition ranking): highest percent -> rank 1.
  const rankMap = new Map<number, number>();
  if (validStudentPercents.length > 0) {
    // Count occurrences per percent
    const percentCounts = new Map<number, number>();
    for (const e of validStudentPercents) {
      percentCounts.set(e.percent, (percentCounts.get(e.percent) || 0) + 1);
    }

    // Sorted unique percents descending
    const uniquePercentsDesc = Array.from(percentCounts.keys()).sort((a, b) => b - a);

    let currentRank = 1;
    for (const p of uniquePercentsDesc) {
      const count = percentCounts.get(p) || 0;
      rankMap.set(p, currentRank);
      currentRank += count; // next rank skips by number of ties (standard competition ranking)
    }
  }

  // Determine current student's percent: prefer averageScore prop, else try to find matching student by name
  let currentStudentPercent: number | undefined = typeof averageScore === "number" ? averageScore : undefined;
  if (currentStudentPercent === undefined && studentName && Array.isArray(students)) {
    const match = (students as any[]).find((s) => {
      const name = (s?.name || s?.studentName || s?.fullName || s?.fullname || "").toString().trim();
      return name && studentName && name.toLowerCase() === studentName.toLowerCase();
    });
    currentStudentPercent = match ? getNumericPercent(match) : undefined;
  }

  // Lookup rank from map
  const currentStudentRank: number | "N/A" = typeof currentStudentPercent === "number" && rankMap.size > 0
    ? (rankMap.get(currentStudentPercent) ?? "N/A")
    : "N/A";

  // rankingTotal is the length of students array (total certificates generated). Fallback to 0.
  const rankingTotal = (students?.length ?? 0);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-certificate rounded-lg border-2 border-primary">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-secondary pb-6">
        <div className="flex items-center justify-center gap-6 mb-4">
          {schoolLogo ? (
            <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full overflow-hidden border-2 border-primary">
              <img
                src={schoolLogo}
                alt={schoolName ? `${schoolName} Logo` : "school logo"}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
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
            {(schoolName || institutionName) && (
              <h1 className="text-4xl font-bold text-primary mb-2">{schoolName || institutionName}</h1>
            )}
            {schoolAddress && <p className="text-muted-foreground text-lg">{schoolAddress}</p>}
            {schoolContact && <p className="text-muted-foreground">{schoolContact}</p>}
          </div>
        </div>
        <div className="bg-gradient-subtle p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-2">CERTIFICATE OF ACHIEVEMENT</h2>
          {(session || term) && (
            <p className="text-primary font-medium">
              {session && `${session} Academic Session`}
              {session && term && " - "}
              {term && `${term}`}
            </p>
          )}
        </div>
      </div>

      {/* Certificate Body */}
      <div className="text-center py-12 space-y-8">
        <div className="space-y-6">
          <p className="text-xl text-foreground">This is to certify that</p>

          <div className="border-2 border-primary rounded-lg p-6 bg-gradient-subtle">
            <h3 className="text-4xl font-bold text-primary mb-2">{studentName}</h3>
            <p className="text-lg text-muted-foreground">Student of {schoolName || institutionName}</p>
          </div>

          <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
            has successfully completed{term ? ` the ${term}` : ""}
            {term && session ? " of the " : ""}
            {session ? ` ${session} academic session` : " their studies"}
            {resultRemarkDerived ? ` with a ${resultRemarkDerived}.` : "."}
          </p>

          {/* Achievement details */}
          <div className="bg-gradient-hero p-6 rounded-lg text-white space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{typeof averageScore === "number" ? `${averageScore}%` : "—"}</div>
                <div className="text-white/90">Average Score</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold">{overallGrade || "—"}</div>
                <div className="text-white/90">Grade</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {typeof currentStudentRank === "number"
                    ? `${currentStudentRank} out of ${students?.length ?? 0}`
                    : position
                    ? `${position} out of ${students?.length ?? 0}`
                    : `—`}
                </div>
                <div className="text-white/90">Position</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/90">
              <Users className="w-5 h-5" />
              <span>Out of {students?.length ?? 0} students in the class</span>
            </div>
          </div>

          {dateIssued && (
            <p className="text-base text-muted-foreground">
              Awarded on this <strong>{dateIssued}</strong>
            </p>
          )}

          {/* Result Remark */}
          {resultRemarkDerived && (
            <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 mt-4">
              <p className="text-foreground text-center italic">
                <strong>Remark:</strong> {resultRemarkDerived}
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
              <p className="font-semibold text-foreground">{signatories?.classTeacher || signatories?.instructor}</p>
              <p className="text-muted-foreground text-sm">
                {signatories?.classTeacher ? "Class Teacher" : "Instructor"} - Signature & Date
              </p>
            </div>
          )}
          {(signatories?.headTeacher || signatories?.headOfInstitution) && (
            <div className="text-center max-w-sm">
              <div className="h-16 border-b border-muted-foreground mb-2"></div>
              <p className="font-semibold text-foreground">{signatories?.headTeacher || signatories?.headOfInstitution}</p>
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
          Generated by <span className="font-semibold text-primary">ResultGenie</span>
        </p>
      </div>
    </div>
  );
};