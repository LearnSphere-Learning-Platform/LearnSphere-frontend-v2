import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../components/admin/DashboardLayout";
import { Search, Filter, Star, MoreVertical, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import courseData from "../../catalog/CourseData";

const ITEMS_PER_PAGE = 8;

// Extract instructor data from courseData
const extractInstructorsFromCourseData = () => {
  const instructorMap = new Map();
  
  courseData.forEach(course => {
    const instructor = course.instructor;
    const instructorId = instructor.name.replace(/\s+/g, '').toLowerCase();
    
    if (!instructorMap.has(instructorId)) {
      instructorMap.set(instructorId, {
        id: instructorId,
        name: instructor.name,
        email: instructor.mailid,
        status: "active",
        students: Math.floor(Math.random() * 2000) + 500,
        enrolledDate: "2023-01-15",
        payment: Math.floor(Math.random() * 50000) + 10000,
        courses: 1,
        rating: instructor.overall_rating,
        phone: "+91 9876543210",
        certificates: course.about_course?.skills || [],
        dateOfBirth: "01/01/1985",
        contactNumber: "+91 9876543210",
        highestQualification: "M.Tech Computer Science",
        areaOfInterest: course.about_course?.skills?.[0] || "Programming",
        yearsOfExperience: "5",
        address: "123 Tech Street, Bangalore, Karnataka 560001",
        linkedinProfile: `linkedin.com/in/${instructorId}`,
        githubProfile: `github.com/${instructorId}`,
        portfolioLink: `${instructorId}.dev`,
        twitterProfile: `twitter.com/${instructorId}`,
        skills: course.about_course?.skills || [],
        about: instructor.about?.[0] || "Experienced instructor with expertise in modern technologies.",
        description: instructor.about?.[1] || "Passionate about teaching and helping students learn.",
        bankHolderName: instructor.name,
        accountNumber: "1234567890123456",
        ifscCode: "HDFC0001234",
        panNumber: "ABCDE1234F",
        aadharNumber: "1234 5678 9012",
        total_learners: instructor.total_learners,
        no_of_courses_released: instructor.no_of_courses_released,
        total_reviews: instructor.total_reviews,
        highlights: instructor.highlights || []
      });
    } else {
      // If instructor already exists, increment course count
      const existingInstructor = instructorMap.get(instructorId);
      existingInstructor.courses += 1;
    }
  });
  
  return Array.from(instructorMap.values());
};

const initialData = extractInstructorsFromCourseData();

const newInstructorApplications = [
  {
    id: 201,
    name: "Priya Patel",
    email: "priya.patel@example.com",
    status: "pending",
    dateOfBirth: "12/08/1992",
    contactNumber: "+91 9876543212",
    highestQualification: "M.Sc Computer Science",
    areaOfInterest: "Data Science",
    yearsOfExperience: "3",
    address: "789 Analytics Street, Pune, Maharashtra 411001",
    linkedinProfile: "linkedin.com/in/priyapatel",
    githubProfile: "github.com/priyapatel",
    portfolioLink: "priyapatel.ai",
    twitterProfile: "twitter.com/priya_data",
    certifications: ["Python Data Science", "Machine Learning"],
    skills: ["Python", "TensorFlow", "Pandas", "SQL"],
    about: "Data science enthusiast with expertise in machine learning and analytics.",
    description: "Passionate about teaching data science concepts and helping students understand complex algorithms.",
    bankHolderName: "Priya Patel",
    accountNumber: "9876543210123456",
    ifscCode: "ICICI0001234",
    panNumber: "FGHIJ5678K",
    aadharNumber: "5678 9012 3456",
    appliedDate: "2023-07-15"
  },
  {
    id: 202,
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    status: "pending",
    dateOfBirth: "03/15/1985",
    contactNumber: "+91 9876543213",
    highestQualification: "B.Tech Electronics",
    areaOfInterest: "Mobile Development",
    yearsOfExperience: "7",
    address: "321 Mobile Avenue, Delhi, Delhi 110001",
    linkedinProfile: "linkedin.com/in/amitkumar",
    githubProfile: "github.com/amitkumar",
    portfolioLink: "amitkumar.dev",
    twitterProfile: "twitter.com/amit_mobile",
    certifications: ["React Native Certified", "iOS Development"],
    skills: ["React Native", "Swift", "Kotlin", "Firebase"],
    about: "Mobile development expert with cross-platform expertise.",
    description: "Experienced in building native and cross-platform mobile applications with focus on user experience.",
    bankHolderName: "Amit Kumar",
    accountNumber: "5432167890123456",
    ifscCode: "SBI0001234",
    panNumber: "KLMNO9012P",
    aadharNumber: "9012 3456 7890",
    appliedDate: "2023-07-18"
  }
];

const Instructors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [instructors, setInstructors] = useState(initialData);
  const [newApplications, setNewApplications] = useState(newInstructorApplications);
  const [viewInstructor, setViewInstructor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownId, setDropdownId] = useState(null);
  const { toast } = useToast();

  // Update instructors when courseData changes
  useEffect(() => {
    const updatedInstructors = extractInstructorsFromCourseData();
    setInstructors(updatedInstructors);
  }, []);

  const handleStatusChange = (id, status) => {
    setInstructors((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, status } : inst))
    );
    toast({
      title: "Status Updated",
      description: `Status set to ${status.charAt(0).toUpperCase() + status.slice(1)}`,
    });
    setDropdownId(null);
    setViewInstructor(null);
  };

  const handleApproveInstructor = (instructor) => {
    // Move from new applications to active instructors
    const newInstructor = {
      ...instructor,
      id: Date.now(), // Generate new ID
      status: "active",
      students: 0,
      enrolledDate: new Date().toISOString().split('T')[0],
      payment: 0,
      courses: 0,
      rating: 0
    };
    
    setInstructors(prev => [...prev, newInstructor]);
    setNewApplications(prev => prev.filter(app => app.id !== instructor.id));
    
    toast({
      title: "Instructor Approved",
      description: `${instructor.name} has been approved and added to active instructors.`,
    });
    setViewInstructor(null);
  };

  const handleRejectInstructor = (instructorId) => {
    setNewApplications(prev => prev.filter(app => app.id !== instructorId));
    toast({
      title: "Application Rejected",
      description: "Instructor application has been rejected.",
      variant: "destructive"
    });
    setViewInstructor(null);
  };

  const handleRemoveInstructor = (id) => {
    const updatedInstructors = instructors.filter((inst) => inst.id !== id);
    setInstructors(updatedInstructors);
    const newTotalPages = Math.ceil(updatedInstructors.length / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
    toast({
      title: "Instructor Removed",
      description: "Instructor has been permanently removed.",
      variant: "destructive"
    });
    setDropdownId(null);
    setViewInstructor(null);
  };

  // Determine which data to show based on filter
  let dataToShow = [];
  if (statusFilter === "new") {
    dataToShow = newApplications;
  } else {
    const filteredInstructors = instructors.filter((instructor) => {
      const matchStatus = statusFilter === "all" || instructor.status === statusFilter;
      return matchStatus;
    });
    dataToShow = filteredInstructors;
  }

  // Apply search filter
  const searchFilteredData = dataToShow.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(searchFilteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = searchFilteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#333A2F]">Instructors</h1>
          <p className="text-gray-600">
            Manage instructor profiles, performance, and engagement.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search instructors..."
              className="pl-10 w-full py-2 bg-[#EBEDDF] rounded-lg border-none focus:ring-2 focus:ring-[#C8CBB8] text-[#333A2F]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px] justify-between bg-[#EBEDDF] text-[#333A2F] font-bold hover:bg-[#C8CBB8] border-[#C8CBB8]">
                  {statusFilter === "all" && "All"}
                  {statusFilter === "active" && "Active"}
                  {statusFilter === "inactive" && "Inactive"}
                  {statusFilter === "new" && New (`${newApplications.length}`)}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="bg-white border border-[#C8CBB8] rounded-xl shadow-lg p-2" >
                <DropdownMenuItem onClick={() => setStatusFilter("all")} className="hover:bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg px-3 py-2 cursor-pointer">
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")} className="hover:bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg px-3 py-2 cursor-pointer">
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")} className="hover:bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg px-3 py-2 cursor-pointer">
                  Inactive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("new")} className="hover:bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg px-3 py-2 cursor-pointer">
                  New ({newApplications.length})
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow"
            >
              {statusFilter !== "new" && (
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-popover border border-border">
                      <DropdownMenuItem onClick={() => handleStatusChange(item.id, "active")}>
                        Set Active
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(item.id, "inactive")}>
                        Set Inactive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

                              <div className="flex gap-2 items-center mb-3">
                <div className="w-9 h-9 rounded-full bg-[#EBEDDF] flex items-center justify-center text-xs font-bold text-[#333A2F]">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#333A2F]">{item.name}</h2>
                  <p className="text-xs text-gray-600">{item.email}</p>
                </div>
              </div>

              {statusFilter === "new" ? (
                <>
                  <span className="px-2 py-0.5 text-xs font-medium mb-2 inline-block rounded-lg bg-[#C8CBB8] text-[#333A2F] font-bold">
                    pending approval
                  </span>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Experience: {item.yearsOfExperience} years</span>
                    <span className="text-gray-400">{item.appliedDate}</span>
                  </div>
                  <div className="text-xs mb-2">
                    <span className="text-gray-600">Qualification: {item.highestQualification}</span>
                  </div>
                </>
              ) : (
                <>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium mb-2 inline-block rounded-lg font-bold ${
                      item.status === "active"
                        ? "bg-[#C8CBB8] text-[#333A2F]"
                        : "bg-[#EBEDDF] text-[#333A2F]"
                    }`}
                  >
                    {item.status}
                  </span>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Students: {item.students}</span>
                    <span className="text-gray-400">{item.enrolledDate}</span>
                  </div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-600">Payment: ₹{item.payment}</span>
                    <span className="text-gray-600">Courses: {item.courses}</span>
                  </div>
                  {item.rating > 0 && (
                    <div className="flex items-center gap-1 text-yellow-500 text-xs mb-2">
                      {Array.from({ length: Math.round(item.rating) }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      <span className="ml-1 text-[#333A2F]">({item.rating})</span>
                    </div>
                  )}
                </>
              )}

              <div className="text-right">
                <Button
                  onClick={() => setViewInstructor(item)}
                  size="sm"
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-[#333A2F] text-white font-bold rounded-lg hover:bg-[#2a3028]"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg hover:bg-[#C8CBB8]"
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg hover:bg-[#C8CBB8]"
          >
            Next
          </Button>
        </div>

        {viewInstructor && (
          <Dialog open={true} onOpenChange={() => setViewInstructor(null)}>
            <DialogContent className="max-w-4xl rounded-xl shadow-2xl bg-white border border-[#C8CBB8] max-h-[90vh] overflow-y-auto p-8">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[#333A2F]">
                  {statusFilter === "new" ? "Instructor Application Details" : "Instructor Details"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Personal & Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold border-b border-[#C8CBB8] pb-1 text-[#333A2F]">
                    Personal & Professional Information
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mt-3">
                    <div>
                      <p className="font-medium text-[#333A2F]">Date of Birth:</p>
                      <p className="text-gray-600">{viewInstructor.dateOfBirth || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">Contact Number:</p>
                      <p className="text-gray-600">{viewInstructor.contactNumber || viewInstructor.phone || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">Highest Qualification:</p>
                      <p className="text-gray-600">{viewInstructor.highestQualification || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">Area of Interest:</p>
                      <p className="text-gray-600">{viewInstructor.areaOfInterest || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">Years of Experience:</p>
                      <p className="text-gray-600">{viewInstructor.yearsOfExperience || "N/A"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium text-[#333A2F]">Address:</p>
                      <p className="text-gray-600">{viewInstructor.address || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">LinkedIn Profile:</p>
                      <p className="text-gray-600">{viewInstructor.linkedinProfile || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">GitHub Profile:</p>
                      <p className="text-gray-600">{viewInstructor.githubProfile || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">Portfolio Link:</p>
                      <p className="text-gray-600">{viewInstructor.portfolioLink || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">Twitter Profile:</p>
                      <p className="text-gray-600">{viewInstructor.twitterProfile || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Certifications & Skills */}
                <div>
                  <h3 className="text-lg font-semibold border-b border-[#C8CBB8] pb-1 text-[#333A2F]">
                    Certifications & Skills
                  </h3>
                  <div className="space-y-3 mt-3">
                    <div>
                      <p className="font-medium text-[#333A2F] mb-2">Certifications:</p>
                      <div className="flex flex-wrap gap-2">
                        {(viewInstructor.certifications || viewInstructor.certificates || []).map((cert, idx) => (
                          <span
                            key={idx}
                            className="bg-[#C8CBB8] text-[#333A2F] text-xs font-medium px-2.5 py-0.5 rounded-lg font-bold"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F] mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {(viewInstructor.skills || []).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-[#EBEDDF] text-[#333A2F] text-xs font-medium px-2.5 py-0.5 rounded-lg font-bold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">About:</p>
                      <p className="text-gray-600 text-sm">{viewInstructor.about || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">Description:</p>
                      <p className="text-gray-600 text-sm">{viewInstructor.description || "N/A"}</p>
                    </div>
                    {viewInstructor.highlights && viewInstructor.highlights.length > 0 && (
                      <div>
                        <p className="font-medium text-[#333A2F] mb-2">Highlights:</p>
                        <ul className="space-y-1">
                          {viewInstructor.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                              <span className="text-[#333A2F] mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Details */}
                <div>
                  <h3 className="text-lg font-semibold border-b border-[#C8CBB8] pb-1 text-[#333A2F]">
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mt-3">
                    <div>
                      <p className="font-medium text-[#333A2F]">Bank Holder Name:</p>
                      <p className="text-gray-600">{viewInstructor.bankHolderName || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">Account Number:</p>
                      <p className="text-gray-600">{viewInstructor.accountNumber || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">IFSC Code:</p>
                      <p className="text-gray-600">{viewInstructor.ifscCode || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">PAN Number:</p>
                      <p className="text-gray-600">{viewInstructor.panNumber || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#333A2F]">Aadhar Number:</p>
                      <p className="text-gray-600">{viewInstructor.aadharNumber || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Statistics (for existing instructors) */}
                {statusFilter !== "new" && (
                  <div>
                    <h3 className="text-lg font-semibold border-b border-[#C8CBB8] pb-1 text-[#333A2F]">
                      Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-3">
                      <div>
                        <p className="font-medium text-[#333A2F]">Students:</p>
                        <p className="text-gray-600">{viewInstructor.students}</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#333A2F]">Rating:</p>
                        <p className="text-gray-600">{viewInstructor.rating}</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#333A2F]">Enrolled Date:</p>
                        <p className="text-gray-600">{viewInstructor.enrolledDate}</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#333A2F]">Payment:</p>
                        <p className="text-gray-600">₹{viewInstructor.payment}</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#333A2F]">Courses:</p>
                        <p className="text-gray-600">{viewInstructor.courses}</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#333A2F]">Status:</p>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-lg text-xs font-bold ${
                            viewInstructor.status === "active"
                              ? "bg-[#C8CBB8] text-[#333A2F]"
                              : "bg-[#EBEDDF] text-[#333A2F]"
                          }`}
                        >
                          {viewInstructor.status}
                        </span>
                      </div>
                      {viewInstructor.total_learners && (
                        <div>
                          <p className="font-medium text-[#333A2F]">Total Learners:</p>
                          <p className="text-gray-600">{viewInstructor.total_learners}</p>
                        </div>
                      )}
                      {viewInstructor.no_of_courses_released && (
                        <div>
                          <p className="font-medium text-[#333A2F]">Courses Released:</p>
                          <p className="text-gray-600">{viewInstructor.no_of_courses_released}</p>
                        </div>
                      )}
                      {viewInstructor.total_reviews && (
                        <div>
                          <p className="font-medium text-[#333A2F]">Total Reviews:</p>
                          <p className="text-gray-600">{viewInstructor.total_reviews}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#C8CBB8]">
                {statusFilter === "new" ? (
                  <>
                    <Button
                      onClick={() => handleRejectInstructor(viewInstructor.id)}
                       className="px-5 py-2 text-sm bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
                      variant="destructive"
                    >
                      
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApproveInstructor(viewInstructor)}
                      className="px-5 py-2 text-sm bg-[#333A2F] text-white font-bold rounded-lg hover:bg-[#2a3028] transition"
                      variant="success"
                    >
                      Approve
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => handleRemoveInstructor(viewInstructor.id)}
                    className="px-5 py-2 text-sm bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
                    variant="destructive"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Instructors;