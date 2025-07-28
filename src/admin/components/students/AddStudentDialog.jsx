import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Upload, X, FileText, Users } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import Papa from "papaparse";

export const AddStudentDialog = ({ open, onOpenChange }) => {
  const [uploadMethod, setUploadMethod] = useState("single"); // "single" or "bulk"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enrollmentDate: ""
  });
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleSingleStudentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Success",
      description: `Student ${formData.name} has been added successfully!`,
    });
    
    setFormData({ name: "", email: "", phone: "", enrollmentDate: "" });
    setLoading(false);
    onOpenChange(false);
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setCsvFile(file);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setCsvData(results.data);
        toast({
          title: "File Uploaded",
          description: `${results.data.length} students found in CSV file.`,
        });
      },
      error: function (error) {
        toast({
          title: "Error",
          description: "Failed to parse CSV file. Please check the format.",
          variant: "destructive"
        });
      }
    });
  };

  const handleBulkUpload = async () => {
    if (csvData.length === 0) {
      toast({
        title: "Error",
        description: "Please upload a CSV file first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Success",
      description: `${csvData.length} students have been added successfully!`,
    });
    
    setCsvFile(null);
    setCsvData([]);
    setLoading(false);
    onOpenChange(false);
  };

  const downloadTemplate = () => {
    const csvContent = "name,email,phone,enrollmentDate\nJohn Doe,john@example.com,+1234567890,2024-01-15\nJane Smith,jane@example.com,+1234567891,2024-01-15";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#EBEDDF] rounded-xl shadow-2xl border border-[#C8CBB8] p-8">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-[#333A2F]">
            <Users className="w-6 h-6 text-[#333A2F]" />
            Add Students
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Method Selection */}
          <div className="flex gap-4">
            <Button
              variant={uploadMethod === "single" ? "default" : "outline"}
              onClick={() => setUploadMethod("single")}
              className={`flex-1 font-bold rounded-lg ${uploadMethod === "single" ? 'bg-[#333A2F] text-white hover:bg-[#2a3028]' : 'bg-white text-[#333A2F] border-[#C8CBB8]'}`}
            >
              Single Student
            </Button>
            <Button
              variant={uploadMethod === "bulk" ? "default" : "outline"}
              onClick={() => setUploadMethod("bulk")}
              className={`flex-1 font-bold rounded-lg ${uploadMethod === "bulk" ? 'bg-[#333A2F] text-white hover:bg-[#2a3028]' : 'bg-white text-[#333A2F] border-[#C8CBB8]'}`}
            >
              Bulk Upload
            </Button>
          </div>

          {uploadMethod === "single" ? (
            /* Single Student Form */
            <form onSubmit={handleSingleStudentSubmit} className="space-y-6 bg-white rounded-xl shadow-xl p-8">
              <div>
                <Label htmlFor="name" className="text-[#333A2F] font-bold">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter student's full name"
                  required
                  className="bg-[#EBEDDF] rounded-lg border-none focus:ring-2 focus:ring-[#C8CBB8]"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#333A2F] font-bold">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email address"
                  required
                  className="bg-[#EBEDDF] rounded-lg border-none focus:ring-2 focus:ring-[#C8CBB8]"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-[#333A2F] font-bold">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter phone number"
                  className="bg-[#EBEDDF] rounded-lg border-none focus:ring-2 focus:ring-[#C8CBB8]"
                />
              </div>

              <div>
                <Label htmlFor="enrollmentDate" className="text-[#333A2F] font-bold">Enrollment Date</Label>
                <Input
                  id="enrollmentDate"
                  type="date"
                  value={formData.enrollmentDate}
                  onChange={(e) => setFormData({...formData, enrollmentDate: e.target.value})}
                  className="bg-[#EBEDDF] rounded-lg border-none focus:ring-2 focus:ring-[#C8CBB8]"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading} className="flex-1 bg-[#333A2F] text-white font-bold rounded-lg hover:bg-[#2a3028]">
                  {loading ? "Adding..." : "Add Student"}
                </Button>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-lg border-[#C8CBB8] text-[#333A2F] font-bold">
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            /* Bulk Upload */
            <div className="space-y-8">
              {/* CSV Template Download */}
              <div className="bg-[#EBEDDF] p-6 rounded-xl">
                <h3 className="font-bold mb-2 text-[#333A2F]">CSV Format Requirements</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Your CSV file should contain the following columns: name, email, phone, enrollmentDate
                </p>
                <Button variant="outline" size="sm" onClick={downloadTemplate} className="rounded-lg border-[#C8CBB8] text-[#333A2F] font-bold">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
              </div>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-[#C8CBB8] rounded-xl p-8 text-center bg-white">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                />
                {!csvFile ? (
                  <div>
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-bold mb-2 text-[#333A2F]">Upload CSV File</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Click to browse or drag and drop your CSV file here
                    </p>
                    <Button onClick={() => fileInputRef.current?.click()} className="bg-[#333A2F] text-white font-bold rounded-lg hover:bg-[#2a3028]">
                      Choose File
                    </Button>
                  </div>
                ) : (
                  <div>
                    <FileText className="w-12 h-12 mx-auto mb-4 text-[#333A2F]" />
                    <h3 className="font-bold mb-2 text-[#333A2F]">{csvFile.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {csvData.length} students ready to import
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={handleBulkUpload} disabled={loading} className="bg-[#333A2F] text-white font-bold rounded-lg hover:bg-[#2a3028]">
                        {loading ? "Uploading..." : "Import Students"}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setCsvFile(null);
                          setCsvData([]);
                        }}
                        className="rounded-lg border-[#C8CBB8] text-[#333A2F] font-bold"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Table */}
              {csvData.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-[#333A2F]">Preview (First 5 rows)</h3>
                  <div className="border rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#EBEDDF]">
                          <tr>
                            <th className="px-4 py-2 text-left text-[#333A2F]">Name</th>
                            <th className="px-4 py-2 text-left text-[#333A2F]">Email</th>
                            <th className="px-4 py-2 text-left text-[#333A2F]">Phone</th>
                            <th className="px-4 py-2 text-left text-[#333A2F]">Enrollment Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {csvData.slice(0, 5).map((row, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-2 text-[#333A2F]">{row.name}</td>
                              <td className="px-4 py-2 text-[#333A2F]">{row.email}</td>
                              <td className="px-4 py-2 text-[#333A2F]">{row.phone}</td>
                              <td className="px-4 py-2 text-[#333A2F]">{row.enrollmentDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {csvData.length > 5 && (
                    <p className="text-sm text-gray-600">
                      ... and {csvData.length - 5} more students
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 rounded-lg border-[#C8CBB8] text-[#333A2F] font-bold">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};