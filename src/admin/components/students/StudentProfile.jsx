import React from "react"
import jsPDF from "jspdf"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Progress } from "../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
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
  Download
} from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

export const StudentProfile = ({ student, open, onOpenChange }) => {
  if (!student) return null

  const enrolledCourses = [
    { id: 1, name: "Introduction to React", progress: 80, grade: "A", status: "Active" },
    { id: 2, name: "Advanced JavaScript", progress: 70, grade: "B+", status: "Active" },
    { id: 3, name: "Data Structures", progress: 100, grade: "A+", status: "Completed" },
  ]

  const forumActivity = [
    { id: 1, type: "post", title: "Question about React Hooks", date: "2024-01-15", replies: 5 },
    { id: 2, type: "reply", title: "Re ES6 Features", date: "2024-01-14", replies: 2 },
    { id: 3, type: "post", title: "Project showcase - Todo App", date: "2024-01-12", replies: 8 },
  ]

  const certificates = [
    { id: 1, name: "React Fundamentals", date: "2024-01-10", verified: true },
    { id: 2, name: "JavaScript Advanced", date: "2024-01-08", verified: false },
  ]
  const progressChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Study Hours',
        data: [8, 12, 10, 15, 18, 20],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Assignment Completion',
        data: [2, 3, 2, 4, 5, 6],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      }
    ]
  }

  const efficiencyData = {
    labels: ['Comprehension', 'Speed', 'Accuracy', 'Retention', 'Application'],
    datasets: [
      {
        label: 'Performance Score',
        data: [85, 78, 92, 88, 82],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(251, 191, 36)',
          'rgb(239, 68, 68)',
          'rgb(168, 85, 247)'
        ],
        borderWidth: 2
      }
    ]
  }

  // Certificate component that will be captured
  const CertificateTemplate = ({ studentName, courseName, date, ref }) => (
    <div
      ref={ref}
      className="w-[800px] h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 p-8 border-8 border-amber-600 relative mx-auto"
      style={{ fontFamily: 'serif' }}
    >
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-amber-600"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-amber-600"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-amber-600"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-amber-600"></div>

      <div className="text-center h-full flex flex-col justify-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">CERTIFICATE</h1>
        <h2 className="text-2xl text-amber-600 tracking-widest mb-12">OF COMPLETION</h2>
        
        <p className="text-lg text-gray-600 mb-8">THIS CERTIFICATE IS AWARDED TO :</p>
        
        <div className="mb-8">
          <h3 className="text-4xl font-bold text-gray-800 border-b-2 border-amber-600 pb-2 inline-block">
            {studentName?.toUpperCase()}
          </h3>
        </div>
        
        <p className="text-lg text-gray-600 mb-4">
          FOR COMPLETING A CERTIFICATION PROGRAM FOR
        </p>
        <p className="text-xl font-semibold text-gray-800 mb-12">
          "{courseName}" AT LEARN SPHERE.
        </p>

        {/* Logo placeholder */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">LS</span>
          </div>
        </div>

        <div className="flex justify-between items-end mt-auto">
          <div className="text-left">
            <div className="border-b border-gray-400 w-32 mb-2"></div>
            <p className="text-sm text-gray-600">COURSE ID</p>
          </div>
          
          <div className="text-right">
            <div className="border-b border-gray-400 w-32 mb-2"></div>
            <p className="text-sm text-gray-600">INSTRUCTOR SIGNATURE</p>
          </div>
        </div>
      </div>
    </div>
  )
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
    doc.text(`For completing the course "${cert.name}"`, 421, 230, { align: "center" });

    doc.text(`Date: ${new Date(cert.date).toLocaleDateString()}`, 421, 270, { align: "center" });

    doc.text("Learn Sphere", 421, 310, { align: "center" });

    doc.save(`${student.name.replace(/\s/g, "_")}_${cert.name.replace(/\s/g, "_")}_certificate.pdf`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {student.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground">{student.email}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Only Personal Information shown now */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      Enrolled: {new Date(student.enrolledDate).toLocaleDateString()}
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
                <Card key={course.id} className="rounded-md">
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold">{course.name}</h3>
                      <Badge
                        variant={course.status === "Completed" ? "default" : "secondary"}
                        className="text-xs px-2 py-0.5"
                      >
                        {course.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{course.progress}%</span>
                      <span className="text-base font-bold">{course.grade}</span>
                    </div>

                    <div className="w-[70%]">
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Learning Progress Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">85%</div>
                      <div className="text-sm text-muted-foreground">Avg. Completion</div>
                    </div>
                    <div className="text-center p-4 bg-accent/5 rounded-lg">
                      <div className="text-2xl font-bold text-accent">24h</div>
                      <div className="text-sm text-muted-foreground">Study Time</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/5 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">15</div>
                      <div className="text-sm text-muted-foreground">Assignments</div>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleDownloadReport}>
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
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold">{activity.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {activity.type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {activity.replies} replies
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
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
                <Card key={cert.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="w-8 h-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">{cert.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Earned: {new Date(cert.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {cert.verified && <Badge variant="default">Verified</Badge>}
                        <Button
                          size="sm"
                          variant="outline"
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
  )
}
