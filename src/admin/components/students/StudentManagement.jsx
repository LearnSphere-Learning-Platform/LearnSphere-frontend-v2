import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  UserCheck,
  UserX,
  Key,
  Mail,
  BookOpen,
  AlertTriangle,
  Download,
  FileText,
  Calendar,
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export const StudentManagement = ({ student, open, onOpenChange, action }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async (actionType) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Success",
      description: `Student ${actionType} completed successfully.`,
    });

    setLoading(false);
    onOpenChange(false);
  };

  if (!student) return null;

  const renderManageActions = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Current Status</span>
              <Badge variant={student.status === "active" ? "default" : "secondary"}>
                {student.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={student.status === "active" ? "destructive" : "default"}
                onClick={() => handleAction(student.status === "active" ? "deactivated" : "activated")}
                disabled={loading}
              >
                {student.status === "active" ? (
                  <>
                    <UserX className="w-4 h-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Activate
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleAction("deleted")}
                disabled={loading}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Send Message */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Send Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Enter message subject" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message here..." />
          </div>
          <Button onClick={() => handleAction("message sent")} disabled={loading}>
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderEnrollmentManagement = () => (
    <div className="space-y-6">
      {/* Current Enrollments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Current Enrollments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Introduction to React", "Advanced JavaScript", "Data Structures"].map((course, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <span className="font-medium">{course}</span>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleAction(`unenrolled from ${course}`)}
                disabled={loading}
              >
                Unenroll
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Enroll in New Course */}
      <Card>
        <CardHeader>
          <CardTitle>Enroll in New Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="course-select">Select Course</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python-basics">Python Basics</SelectItem>
                <SelectItem value="web-design">Web Design Fundamentals</SelectItem>
                <SelectItem value="machine-learning">Machine Learning Intro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => handleAction("enrolled in new course")} disabled={loading}>
            <BookOpen className="w-4 h-4 mr-2" />
            Enroll Student
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const getTitle = () => {
    switch (action) {
      case "manage":
        return "Manage Student Account";
      case "enrollment":
        return "Manage Course Enrollment";
      case "message":
        return "Send Message to Student";
      default:
        return "Student Management";
    }
  };

  const renderContent = () => {
    switch (action) {
      case "manage":
        return renderManageActions();
      case "enrollment":
        return renderEnrollmentManagement();
      case "message":
        return renderManageActions();
      default:
        return renderManageActions();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <p className="text-muted-foreground">
            Managing: {student.name} ({student.email})
          </p>
        </DialogHeader>
        <div className="mt-4">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  );
};