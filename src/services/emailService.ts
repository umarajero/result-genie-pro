import { generatePDFFromElement } from '@/lib/pdfGenerator';
import { supabase } from '@/integrations/supabase/client';
import { StudentRecord, SchoolInfo } from '@/hooks/useStudentData';

interface SendEmailParams {
  student: StudentRecord;
  schoolInfo: SchoolInfo | null;
  documentType: 'certificate' | 'statement';
  pdfElement: HTMLElement;
}

export const sendResultEmail = async ({
  student,
  schoolInfo,
  documentType,
  pdfElement,
}: SendEmailParams): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!student.email || !student.email.includes('@')) {
      throw new Error('Invalid or missing email address for this student');
    }

    const pdfBase64 = await generatePDFFromElement(pdfElement);

    const { data, error } = await supabase.functions.invoke('send-result-email', {
      body: {
        studentName: student.name,
        studentEmail: student.email,
        schoolName: schoolInfo?.name || 'School',
        documentType,
        pdfBase64,
      },
    });

    if (error) {
      throw new Error(error.message || 'Failed to send email');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message || 'Failed to send email',
    };
  }
};

export const validateEmail = (email?: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
