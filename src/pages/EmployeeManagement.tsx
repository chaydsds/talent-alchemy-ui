
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Upload, Download, Users } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  joiningDate: string;
  designation: string;
}

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === "text/csv" || file.name.endsWith('.csv')
    );
    
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles[0]);
    } else {
      toast.error("Please upload a CSV file only.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        handleFileUpload(file);
      } else {
        toast.error("Please upload a CSV file only.");
      }
    }
  };

  const parseCSV = (csvText: string): Employee[] => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    // Expected headers: name, employeeid, joiningdate, designation
    const nameIndex = headers.findIndex(h => h.includes('name'));
    const idIndex = headers.findIndex(h => h.includes('id') || h.includes('employee'));
    const dateIndex = headers.findIndex(h => h.includes('date') || h.includes('joining'));
    const designationIndex = headers.findIndex(h => h.includes('designation') || h.includes('position') || h.includes('role'));
    
    if (nameIndex === -1 || idIndex === -1 || dateIndex === -1 || designationIndex === -1) {
      throw new Error("CSV must contain columns: Name, Employee ID, Joining Date, Designation");
    }
    
    const employees: Employee[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      
      if (values.length >= 4) {
        employees.push({
          id: `emp-${Date.now()}-${i}`,
          name: values[nameIndex],
          employeeId: values[idIndex],
          joiningDate: values[dateIndex],
          designation: values[designationIndex]
        });
      }
    }
    
    return employees;
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    try {
      const text = await file.text();
      const parsedEmployees = parseCSV(text);
      
      setEmployees(prev => [...parsedEmployees, ...prev]);
      toast.success(`Successfully imported ${parsedEmployees.length} employees!`);
    } catch (error) {
      console.error("Error parsing CSV:", error);
      toast.error(error instanceof Error ? error.message : "Failed to parse CSV file");
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      ["Name", "Employee ID", "Joining Date", "Designation"],
      ["John Doe", "EMP001", "2024-01-15", "Software Engineer"],
      ["Jane Smith", "EMP002", "2024-02-20", "Product Manager"],
      ["Mike Johnson", "EMP003", "2024-03-10", "UI/UX Designer"]
    ];
    
    const csvContent = sampleData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employee_sample.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearEmployees = () => {
    setEmployees([]);
    toast.success("Employee list cleared");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Employee Management</h1>
          <p className="text-gray-600 text-lg">
            Add existing employees by uploading a CSV file with their details
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Employee CSV
              </CardTitle>
              <CardDescription>
                Upload a CSV file containing employee information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                } transition-colors duration-200`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                  <Upload className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium">
                  Drag and drop your CSV file
                </h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  Or click to browse files
                </p>
                <input
                  type="file"
                  id="csvUpload"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById("csvUpload")?.click()}
                  variant="outline"
                  disabled={isUploading}
                >
                  {isUploading ? "Processing..." : "Browse Files"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                CSV Format Guide
              </CardTitle>
              <CardDescription>
                Download a sample CSV file to see the required format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Required Columns:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Name:</strong> Employee full name</li>
                  <li>• <strong>Employee ID:</strong> Unique identifier</li>
                  <li>• <strong>Joining Date:</strong> Date of joining (YYYY-MM-DD)</li>
                  <li>• <strong>Designation:</strong> Job title/position</li>
                </ul>
              </div>
              <Button onClick={downloadSampleCSV} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Sample CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        {employees.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Imported Employees ({employees.length})
                  </CardTitle>
                  <CardDescription>
                    Review the imported employee data
                  </CardDescription>
                </div>
                <Button onClick={clearEmployees} variant="outline" size="sm">
                  Clear List
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Joining Date</TableHead>
                      <TableHead>Designation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.employeeId}</TableCell>
                        <TableCell>{employee.joiningDate}</TableCell>
                        <TableCell>{employee.designation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline">
                  Save as Draft
                </Button>
                <Button>
                  Save Employees
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {employees.length === 0 && !isUploading && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No employees imported yet</h3>
            <p className="text-gray-500">Upload a CSV file to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;
