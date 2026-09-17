import React from "react";
import jsPDF from "jspdf";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  MessageSquare,
  TrendingUp,
  Download,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

export const StudentProfile = ({ student, open, onOpenChange }) => {
  if (!student) return null;

  const enrolledCourses = [
    {
      id: 1,
      name: "Introduction to React",
      progress: 80,
      grade: "A",
      status: "Active",
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      progress: 70,
      grade: "B+",
      status: "Active",
    },
    {
      id: 3,
      name: "Data Structures",
      progress: 100,
      grade: "A+",
      status: "Completed",
    },
  ];

  const forumActivity = [
    {
      id: 1,
      type: "post",
      title: "Question about React Hooks",
      date: "2024-01-15",
      replies: 5,
    },
    {
      id: 2,
      type: "reply",
      title: "Re ES6 Features",
      date: "2024-01-14",
      replies: 2,
    },
    {
      id: 3,
      type: "post",
      title: "Project showcase - Todo App",
      date: "2024-01-12",
      replies: 8,
    },
  ];

  const certificates = [
    { id: 1, name: "React Fundamentals", date: "2024-01-10", verified: true },
    { id: 2, name: "JavaScript Advanced", date: "2024-01-08", verified: false },
  ];
  const progressChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Study Hours",
        data: [8, 12, 10, 15, 18, 20],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgb(240, 231, 231)",
        tension: 0.4,
      },
      {
        label: "Assignment Completion",
        data: [2, 3, 2, 4, 5, 6],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(250, 250, 250, 0.98)",
        tension: 0.4,
      },
    ],
  };

  const efficiencyData = {
    labels: ["Comprehension", "Speed", "Accuracy", "Retention", "Application"],
    datasets: [
      {
        label: "Performance Score",
        data: [85, 78, 92, 88, 82],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(34, 197, 94)",
          "rgb(251, 191, 36)",
          "rgb(239, 68, 68)",
          "rgb(168, 85, 247)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // NOTE: an unused `CertificateTemplate` component (a fixed 800x600 certificate mockup) used
  // to live here. It was never rendered anywhere in this file - the real certificate download
  // below (`handleDownloadCertificate`) builds the PDF directly with jsPDF text calls and never
  // referenced it. Removed as dead code rather than "responsively fixing" markup nobody ever saw.
  const handleDownloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Learning Progress Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${student.name}`, 20, 40);
    doc.text(`Email: ${student.email}`, 20, 50);
    doc.text("Avg. Completion: 85%", 20, 70);
    doc.text("Study Time: 24h", 20, 80);
    doc.text("Assignments: 15", 20, 90);

    doc.save(`${student.name.replace(/\s/g, "_")}_progress_report.pdf`);
  };

  const handleDownloadCertificate = (cert) => {
    const doc = new jsPDF("landscape", "px", "a4");

    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFICATE OF COMPLETION", 421, 100, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("This certificate is awarded to", 421, 150, { align: "center" });

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(student.name.toUpperCase(), 421, 190, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(`For completing the course "${cert.name}"`, 421, 230, {
      align: "center",
    });

    doc.text(`Date: ${new Date(cert.date).toLocaleDateString()}`, 421, 270, {
      align: "center",
    });

    doc.text("Learn Sphere", 421, 310, { align: "center" });

    doc.save(
      `${student.name.replace(/\s/g, "_")}_${cert.name.replace(
        /\s/g,
        "_"
      )}_certificate.pdf`
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-gray-900">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar} />
              <AvatarFallback className="bg-[#333A2F] text-white">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {student.name}
              </h2>
              <p className="text-gray-600">{student.email}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-5 bg-[#C8CBB8]">
            <TabsTrigger value="overview" className="text-[#333A2F]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="courses" className="text-[#333A2F]">
              Courses
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-[#333A2F]">
              Progress
            </TabsTrigger>
            <TabsTrigger value="forum" className="text-[#333A2F]">
              Forum
            </TabsTrigger>
            <TabsTrigger value="certificates" className="text-[#333A2F]">
              Certificates
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Only Personal Information shown now */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <User className="w-5 h-5 text-[#333A2F]" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#333A2F]" />
                    <span className="text-sm text-gray-900">
                      {student.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#333A2F]" />
                    <span className="text-sm text-gray-900">
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#333A2F]" />
                    <span className="text-sm text-gray-900">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#333A2F]" />
                    <span className="text-sm text-gray-900">
                      Enrolled:{" "}
                      {new Date(student.enrolledDate).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-1">
            <div className="grid gap-3">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="rounded-md bg-white border border-gray-200 shadow-sm"
                >
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {course.name}
                      </h3>
                      <Badge
                        variant={
                          course.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                        className={`text-xs px-2 py-0.5 ${
                          course.status === "Completed"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-400 text-black"
                        }`}
                      >
                        {course.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">{course.progress}%</span>
                      <span className="text-base font-bold text-gray-900">
                        {course.grade}
                      </span>
                    </div>

                    <div className="w-[70%]">
                      <Progress
                        value={course.progress}
                        className="h-1.5 bg-[#C8CBB8]"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-4">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Award className="w-5 h-5 text-[#333A2F]" />
                  Learning Progress Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-[#C8CBB8] rounded-lg border border-[#EBEDDF]">
                      <div className="text-2xl font-bold text-[#333A2F]">
                        85%
                      </div>
                      <div className="text-sm text-gray-700">
                        Avg. Completion
                      </div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="text-2xl font-bold text-yellow-600">
                        24h
                      </div>
                      <div className="text-sm text-gray-700">Study Time</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="text-2xl font-bold text-green-600">
                        15
                      </div>
                      <div className="text-sm text-gray-700">Assignments</div>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-[#333A2F] text-white hover:bg-[#22261C] font-bold transition-colors"
                    onClick={handleDownloadReport}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forum Activity Tab */}
          <TabsContent value="forum" className="space-y-4">
            <div className="grid gap-4">
              {forumActivity.map((activity) => (
                <Card
                  key={activity.id}
                  className="bg-white border border-gray-200 shadow-sm"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-[#333A2F] mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {activity.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs bg-[#C8CBB8] text-[#333A2F] border-[#C8CBB8]"
                            >
                              {activity.type}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {activity.replies} replies
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-4">
            <div className="grid gap-4">
              {certificates.map((cert) => (
                <Card
                  key={cert.id}
                  className="bg-white border border-gray-200 shadow-sm"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="w-8 h-8 text-[#333A2F]" />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {cert.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Earned: {new Date(cert.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {cert.verified && (
                          <Badge
                            variant="default"
                            className="bg-green-500 text-white"
                          >
                            Verified
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-2 border-[#333A2F] text-[#333A2F] font-bold hover:bg-[#C8CBB8] transition-colors"
                          onClick={() => handleDownloadCertificate(cert)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
