import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/admin/DashboardLayout";
import { cn } from "../lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";
import {
  Download,
  Users,
  BarChart3,
  TrendingUp,
  FileText,
  CalendarIcon
} from "lucide-react";

const Reports = () => {
  const recentReports = [
    {
      id: "nov-student-progress",
      title: "November Student Progress",
      category: "Student Progress",
      date: "Dec 15, 2024",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      id: "q4-course-analytics", 
      title: "Q4 Course Analytics",
      category: "Course Analytics",
      date: "Dec 14, 2024",
      size: "1.8 MB",
      format: "Excel"
    },
    {
      id: "instructor-review-q4",
      title: "Instructor Review - Q4", 
      category: "Instructor Performance",
      date: "Dec 12, 2024",
      size: "945 KB",
      format: "PDF"
    },
    {
      id: "nov-financial-report",
      title: "November Financial Report",
      category: "Financial Summary", 
      date: "Dec 1, 2024",
      size: "1.2 MB",
      format: "Excel"
    }
  ];

  const reportTypes = [
    {
      id: "student-progress",
      title: "Student Progress Report",
      description: "Detailed analysis of student learning progress and performance",
      icon: Users,
      lastGenerated: "2 hours ago",
      formats: ["PDF", "Excel"]
    },
    {
      id: "course-analytics",
      title: "Course Analytics Report", 
      description: "Comprehensive course performance and engagement metrics",
      icon: BarChart3,
      lastGenerated: "1 day ago",
      formats: ["PDF", "Excel"]
    },
    {
      id: "instructor-performance",
      title: "Instructor Performance",
      description: "Teaching effectiveness and student feedback analysis",
      icon: TrendingUp,
      lastGenerated: "3 days ago",
      formats: ["PDF", "Excel"]
    }
  ];

  const [selectedFormats, setSelectedFormats] = useState({});
  const [dateRanges, setDateRanges] = useState({});
  const [recentReportFormats, setRecentReportFormats] = useState({});

  useEffect(() => {
    const initialFormats = {};
    const initialDateRanges = {};
    const initialRecentFormats = {};

    reportTypes.forEach((report) => {
      initialFormats[report.id] = report.formats[0];
      initialDateRanges[report.id] = {
        from: new Date(),
        to: new Date()
      };
    });

    recentReports.forEach((report) => {
      initialRecentFormats[report.id] = report.format;
    });

    setSelectedFormats(initialFormats);
    setDateRanges(initialDateRanges);
    setRecentReportFormats(initialRecentFormats);
  }, []);

  const handleFormatChange = (reportId, format) => {
    setSelectedFormats((prev) => ({ ...prev, [reportId]: format }));
  };

  const handleDateRangeChange = (reportId, field, date) => {
    setDateRanges((prev) => ({
      ...prev,
      [reportId]: {
        ...prev[reportId],
        [field]: date
      }
    }));
  };

  const handleRecentFormatChange = (reportId, format) => {
    setRecentReportFormats((prev) => ({ ...prev, [reportId]: format }));
  };

  const handleGenerate = (reportId, reportTitle) => {
    const selectedFormat = selectedFormats[reportId];
    const dateRange = dateRanges[reportId];

    const content = `Sample ${reportTitle} Report\nFormat: ${selectedFormat}\nDate Range: ${format(dateRange.from, "PPP")} to ${format(dateRange.to, "PPP")}\nGenerated: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportTitle.replace(/\s+/g, '_')}.${selectedFormat.toLowerCase() === 'pdf' ? 'pdf' : 'xlsx'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownload = (reportTitle, format) => {
    const content = `Sample ${reportTitle} Report\nFormat: ${format}\nDownloaded: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportTitle.replace(/\s+/g, '_')}.${format.toLowerCase() === 'pdf' ? 'pdf' : 'xlsx'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold text-[#333A2F]">Reports</h1>
          <p className="text-gray-600">
            Generate and manage institutional reports
          </p>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList>
            <TabsTrigger value="generate">Generate Reports</TabsTrigger>
            <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reportTypes.map((report, index) => (
                <Card key={report.id} className={cn("bg-white rounded-xl shadow-xl border border-gray-200 relative", index === 2 ? "lg:col-span-1" : "")}> 
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#EBEDDF] rounded-lg">
                        <report.icon className="w-5 h-5 text-[#333A2F]" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base font-bold text-[#333A2F]">{report.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Last Generated</p>
                        <p className="text-sm font-medium">{report.lastGenerated}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Date Range</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">From</p>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal text-xs h-8",
                                    !dateRanges[report.id]?.from && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-3 w-3" />
                                  {dateRanges[report.id]?.from ? format(dateRanges[report.id].from, "MMM dd, yyyy") : "Pick date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={dateRanges[report.id]?.from}
                                  onSelect={(date) => handleDateRangeChange(report.id, 'from', date)}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">To</p>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal text-xs h-8",
                                    !dateRanges[report.id]?.to && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-3 w-3" />
                                  {dateRanges[report.id]?.to ? format(dateRanges[report.id].to, "MMM dd, yyyy") : "Pick date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={dateRanges[report.id]?.to}
                                  onSelect={(date) => handleDateRangeChange(report.id, 'to', date)}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        {report.formats.map((format) => (
                          <label
                            key={format}
                            className="flex items-center gap-2 text-sm cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={`format-${report.id}`}
                              value={format}
                              checked={selectedFormats[report.id] === format}
                              onChange={() => handleFormatChange(report.id, format)}
                              className="w-4 h-4"
                            />
                            {format}
                          </label>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        className="flex items-center gap-2 bg-[#333A2F] hover:bg-[#2a3028] text-white font-bold rounded-lg"
                        onClick={() => handleGenerate(report.id, report.title)}
                      >
                        <Download className="w-4 h-4" />
                        Generate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#333A2F]">Recently Generated Reports</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#EBEDDF] rounded-lg">
                          <FileText className="w-5 h-5 text-[#333A2F]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#333A2F]">{report.title}</h3>
                          <p className="text-sm text-gray-600">{report.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{report.date}</p>
                          <p className="text-xs text-muted-foreground">{report.size}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={recentReportFormats[report.id] || report.format}
                            onValueChange={(value) => handleRecentFormatChange(report.id, value)}
                          >
                            <SelectTrigger className="h-8 w-20 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PDF">PDF</SelectItem>
                              <SelectItem value="Excel">Excel</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-2 bg-[#333A2F] text-white font-bold rounded-lg"
                            onClick={() => handleDownload(report.title, recentReportFormats[report.id] || report.format)}
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;