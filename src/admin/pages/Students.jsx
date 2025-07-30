// [Imports remain unchanged]
import { useState } from "react";
import { DashboardLayout } from "../components/admin/DashboardLayout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { StudentProfile } from "../components/students/StudentProfile";
import { StudentManagement } from "../components/students/StudentManagement";
import { AddStudentDialog } from "../components/students/AddStudentDialog";
import {
  Users,
  Search,
  MoreVertical,
  Eye,
  Settings,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

import Papa from "papaparse";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const studentsData = [
  {
    id: 1,
    name: "Emma Thompson",
    email: "emma.thom@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "marcus.j@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 3,
  },
  {
    id: 3,
    name: "Sophia Chen",
    email: "sophia.chen@email.com",
    status: "inactive",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 2,
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "david.r@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 4,
  },
  {
    id: 5,
    name: "John Doe",
    email: "john.doe@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 1,
  },
  {
    id: 6,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    status: "inactive",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 3,
  },
  {
    id: 7,
    name: "Alex Carter",
    email: "alex.carter@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 2,
  },
  {
    id: 8,
    name: "Mia Lee",
    email: "mia.lee@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 4,
  },
  {
    id: 9,
    name: "Noah Kim",
    email: "noah.kim@email.com",
    status: "inactive",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 3,
  },
  {
    id: 10,
    name: "Lily Brown",
    email: "lily.brown@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 5,
  },
  {
    id: 11,
    name: "James Wilson",
    email: "james.w@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 1,
  },
  {
    id: 12,
    name: "Olivia Martin",
    email: "olivia.m@email.com",
    status: "inactive",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 2,
  },
  {
    id: 13,
    name: "Ethan Walker",
    email: "ethan.w@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 4,
  },
  {
    id: 14,
    name: "Ava Davis",
    email: "ava.d@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 3,
  },
  {
    id: 15,
    name: "Lucas Miller",
    email: "lucas.m@email.com",
    status: "inactive",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 2,
  },
  {
    id: 16,
    name: "Grace Taylor",
    email: "grace.t@email.com",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    coursesEnrolled: 1,
  },
];

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [managementAction, setManagementAction] = useState("manage");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(studentsData);
  const [csvUploadVisible, setCsvUploadVisible] = useState(false);
  const [csvStudents, setCsvStudents] = useState([]);
  const currentUser = { role: "admin" }; // You can change to "student" to test

  const studentsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = studentsData.filter((student) => {
      const keyword = value.toLowerCase();
      return (
        student.name.toLowerCase().includes(keyword) ||
        student.email.toLowerCase().includes(keyword)
      );
    });
    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  // const handleCSVUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   Papa.parse(file, {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: function (results) {
  //       setCsvStudents(results.data);
  //       console.log("Parsed Students from CSV:", results.data);
  //     },
  //   });
  // };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setProfileOpen(true);
  };

  const handleManageStudent = (student, action) => {
    setSelectedStudent(student);
    setManagementAction(action);
    setManagementOpen(true);
  };

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#333A2F] flex items-center gap-3">
              <Users className="w-8 h-8 text-[#333A2F]" />
              Students Management
            </h1>
            <p className="text-gray-600">
              Comprehensive student administration and progress tracking
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full sm:w-auto sm:min-w-[250px]">
            <Card className="bg-white rounded-xl shadow-xl border border-gray-200 h-[70px]">
              <CardContent className="p-2 text-center">
                <div className="text-xl font-bold text-[#333A2F] leading-tight">
                  {filteredStudents.length}
                </div>
                <div className="text-xs text-gray-600">Total Students</div>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-xl shadow-xl border border-gray-200 h-[70px]">
              <CardContent className="p-2 text-center">
                <div className="text-xl font-bold text-green-600 leading-tight">
                  {filteredStudents.filter((s) => s.status === "active").length}
                </div>
                <div className="text-xs text-gray-600">Active Students</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <form
              className="flex flex-1 gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchTerm);
              }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search students by name or email..."
                  className="pl-10 bg-[#EBEDDF] rounded-lg border-none focus:ring-2 focus:ring-[#C8CBB8]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="bg-[#333A2F] text-white hover:bg-[#2a3028] font-bold rounded-lg px-4 flex items-center gap-1"
              >
                <Search className="w-4 h-4 mr-1" />
                Search
              </Button>
            </form>
            <div className="flex flex-col items-end">
              <Button
                className="bg-[#333A2F] text-white hover:bg-[#2a3028] font-bold rounded-lg"
                onClick={() => setAddStudentOpen(true)}
              >
                Add Student
              </Button>
            </div>
          </div>
        </CardContent>

        <div className="flex flex-col justify-between min-h-[calc(100vh-250px)]">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {paginatedStudents.map((student) => (
              <Card
                key={student.id}
                className="bg-white rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10 bg-[#EBEDDF]">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="bg-[#EBEDDF] text-[#333A2F] font-bold">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-[#333A2F] text-sm">
                          {student.name}
                        </h3>
                        <p className="text-xs text-gray-600">{student.email}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 bg-white"
                      >
                        <DropdownMenuItem
                          onClick={() => handleViewProfile(student)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleManageStudent(student, "message")
                          }
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    {currentUser.role === "admin" ? (
                      <select
                        value={student.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          const updated = filteredStudents.map((s) =>
                            s.id === student.id
                              ? { ...s, status: newStatus }
                              : s
                          );
                          setFilteredStudents(updated);
                        }}
                        className={`text-xs rounded px-2 py-1 border text-sm font-bold focus:ring-2 focus:ring-[#C8CBB8] ${
                          student.status === "active"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                    ) : (
                      <Badge
                        className={`text-xs font-bold rounded-lg ${
                          student.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {student.status}
                      </Badge>
                    )}

                    <div className="text-xs text-gray-400">
                      {student.coursesEnrolled} courses
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sticky Pagination */}
          <div className="flex justify-center gap-2 pt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg"
            >
              Previous
            </Button>
            <span className="px-4 text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg"
            >
              Next
            </Button>
          </div>
        </div>

        {/* Profile and Management Dialogs */}
        {selectedStudent && (
          <StudentProfile
            open={profileOpen}
            onOpenChange={setProfileOpen}
            student={selectedStudent}
          />
        )}

        {selectedStudent && (
          <StudentManagement
            open={managementOpen}
            onOpenChange={setManagementOpen}
            student={selectedStudent}
            action={managementAction}
          />
        )}

        <AddStudentDialog
          open={addStudentOpen}
          onOpenChange={setAddStudentOpen}
        />
      </div>
    </DashboardLayout>
  );
};

export default Students;
