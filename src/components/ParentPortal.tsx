import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useStudentData } from '@/hooks/useStudentData';
import { StatementOfResult } from './StatementOfResult';
import { Certificate } from './Certificate';
import {
  Search,
  MessageSquare,
  Download,
  Eye,
  Mail,
  Calendar,
  Award,
  Bell,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { generatePDFFromElement } from '@/lib/pdfGenerator';

export const ParentPortal = () => {
  const { students, schoolInfo, uploadedFileName } = useStudentData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendEmail = async (student: any) => {
    if (!uploadedFileName) {
      toast({
        title: "No Document Uploaded",
        description: "Please upload a result document first.",
        variant: "destructive"
      });
      return;
    }

    if (!student.email) {
      toast({
        title: "Email Not Found",
        description: `No valid email address found for ${student.name}.`,
        variant: "destructive"
      });
      return;
    }

    setSendingEmail(student.id);

    try {
      setSelectedStudent(student);
      setShowCertificate(true);

      await new Promise(resolve => setTimeout(resolve, 500));

      if (!certificateRef.current) {
        throw new Error("Certificate element not found");
      }

      const pdfBase64 = await generatePDFFromElement(certificateRef.current);

      const { data, error } = await supabase.functions.invoke('send-result-email', {
        body: {
          studentName: student.name,
          studentEmail: student.email,
          pdfBase64: pdfBase64,
          documentType: 'statement'
        }
      });

      if (error) throw error;

      toast({
        title: "Email Sent Successfully",
        description: `Result sent to ${student.email}`,
      });

      const newNotification = {
        id: notifications.length + 1,
        type: 'email',
        message: `Result email sent to ${student.name} at ${student.email}`,
        timestamp: new Date().toLocaleString(),
        read: false
      };
      setNotifications([newNotification, ...notifications]);

      setShowCertificate(false);
      setSelectedStudent(null);

    } catch (error) {
      console.error('Email send error:', error);
      toast({
        title: "Failed to Send Email",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive"
      });
      setShowCertificate(false);
      setSelectedStudent(null);
    } finally {
      setSendingEmail(null);
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  if (students.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Parent Portal
          </h2>
          <p className="text-muted-foreground">
            No student data available. Please upload student results first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Parent Portal</h1>
        <p className="text-muted-foreground">
          Access your child's academic results and notifications
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Student Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search">Student Name</Label>
                  <Input
                    id="search"
                    placeholder="Enter student name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {filteredStudents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Student Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.class}</p>
                          {student.email && (
                            <p className="text-xs text-muted-foreground mt-1">{student.email}</p>
                          )}
                        </div>
                        <Badge variant="secondary">{student.grade}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Average Score:</span>
                          <span className="ml-2 font-medium">{student.averageScore}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Marks:</span>
                          <span className="ml-2 font-medium">{student.totalMarks}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Subject Scores:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(student.subjects).map(([subject, score]) => (
                            <div key={subject} className="flex justify-between text-sm">
                              <span>{subject}:</span>
                              <span className="font-medium">{score}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowCertificate(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendEmail(student)}
                          disabled={sendingEmail === student.id}
                        >
                          {sendingEmail === student.id ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Mail className="w-4 h-4 mr-2" />
                          )}
                          Send Email
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Email Notifications
                {notifications.filter(n => !n.read).length > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No notifications yet
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        notification.read
                          ? 'bg-muted/20 border-border'
                          : 'bg-primary/5 border-primary/20'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showCertificate && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Student Certificate</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => toast({
                      title: "Downloading Certificate",
                      description: `Certificate for ${selectedStudent.name} will be downloaded.`,
                    })}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCertificate(false);
                      setSelectedStudent(null);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>

              <div ref={certificateRef}>
                <Certificate
                  studentName={selectedStudent.name}
                  className={selectedStudent.class}
                  session={schoolInfo?.session || new Date().getFullYear().toString()}
                  term="First Term"
                  position="1st"
                  totalStudents={students.length}
                  students={students}
                  schoolName={schoolInfo?.name || ""}
                  schoolAddress={schoolInfo?.address || ""}
                  schoolContact=""
                  schoolLogo={schoolInfo?.logo}
                  averageScore={selectedStudent.averageScore || 0}
                  overallGrade={selectedStudent.grade || "F"}
                  dateIssued={new Date().toLocaleDateString()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
