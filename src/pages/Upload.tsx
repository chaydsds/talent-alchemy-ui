
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { mockCandidates } from "@/lib/mock-data";
import { Upload } from "lucide-react";

interface CandidateResponse {
  name: string;
  skills: string[];
  experience: string;
  education: string;
  contact: {
    email: string;
    phone: string;
  };
  summary: string;
  location?: string; // Add this as it's used in the table but may not be in API response
}

const UploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [parsedCandidates, setParsedCandidates] = useState<any[]>(mockCandidates.slice(0, 3));
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

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
      file => file.type === "application/pdf" || 
             file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    } else {
      toast.error("Please upload PDF or DOCX files only.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter(
        file => file.type === "application/pdf" || 
               file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      
      if (selectedFiles.length > 0) {
        handleFileUpload(selectedFiles);
      } else {
        toast.error("Please upload PDF or DOCX files only.");
      }
    }
  };

  const uploadSingleFile = async (file: File) => {
    try {
      // Update progress for this file
      setUploadProgress(prev => ({...prev, [file.name]: 0}));

      const formData = new FormData();
      formData.append('file', file);
      
      // Create request options
      const options = {
        method: 'POST',
        body: formData,
      };
      
      // For demo purposes, we'll use a simulated API call
      // In production, replace this with your actual API endpoint
      // const response = await fetch('http://localhost:8000/api/v1/upload-resume/', options);
      
      // Simulate API call with progress
      await new Promise<void>((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(prev => ({...prev, [file.name]: progress}));
          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 200);
      });

      // Simulate successful response
      // In production, parse the actual API response
      // const data = await response.json();
      
      // Example response based on the provided JSON structure
      const mockResponse: CandidateResponse = {
        name: file.name.replace('.pdf', '').replace('.docx', '').replace(/_/g, ' '),
        skills: ["React", "TypeScript", "Node.js", "TailwindCSS"].slice(0, Math.floor(Math.random() * 4) + 1),
        experience: `${Math.floor(Math.random() * 10) + 1} years`,
        education: "Computer Science Degree",
        contact: {
          email: `example${Math.floor(Math.random() * 100)}@example.com`,
          phone: `+1 555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
        },
        summary: "Experienced professional with expertise in various technologies.",
        location: ["New York", "San Francisco", "Bangalore", "London"][Math.floor(Math.random() * 4)]
      };
      
      toast.success(`Successfully parsed: ${file.name}`);
      return mockResponse;
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      toast.error(`Failed to upload: ${file.name}`);
      return null;
    }
  };
  
  const handleFileUpload = async (filesToUpload: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...filesToUpload]);
    setIsUploading(true);
    
    const results = [];
    
    // Process files one by one (you could also use Promise.all for parallel processing)
    for (const file of filesToUpload) {
      const result = await uploadSingleFile(file);
      if (result) {
        results.push({
          id: `candidate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: result.name,
          skills: result.skills,
          experience: result.experience,
          location: result.location || "Not specified", 
          education: result.education,
          contact: result.contact,
          summary: result.summary
        });
      }
    }
    
    setIsUploading(false);
    setParsedCandidates(prev => [...results, ...prev]);
    setUploadProgress({});
    
    if (results.length > 0) {
      toast.success(`${results.length} resume${results.length > 1 ? 's' : ''} successfully parsed!`);
    }
  };

  const loadSampleResumes = () => {
    setIsUploading(true);
    
    // Simulate loading sample resumes
    setTimeout(() => {
      setIsUploading(false);
      setParsedCandidates(mockCandidates);
      toast.success("Sample resumes loaded successfully!");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Upload Resumes</h1>
          <p className="text-gray-600 text-lg">
            Upload candidate resumes in PDF or DOCX format for AI-powered parsing
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Resume Upload</CardTitle>
            <CardDescription>
              Drag and drop your files or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              } transition-colors duration-200`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                <Upload className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium">
                Drag and drop your resume files
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                Support for PDF, DOCX
              </p>
              <input
                type="file"
                id="fileUpload"
                multiple
                accept=".pdf,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  onClick={() => document.getElementById("fileUpload")?.click()}
                  variant="outline"
                  disabled={isUploading}
                >
                  Browse Files
                </Button>
                <Button
                  onClick={loadSampleResumes}
                  variant="outline"
                  disabled={isUploading}
                >
                  Test with Sample Resumes
                </Button>
              </div>
            </div>

            {/* Show upload progress if any files are being processed */}
            {Object.keys(uploadProgress).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Upload Progress</h3>
                <div className="space-y-3">
                  {Object.entries(uploadProgress).map(([fileName, progress]) => (
                    <div key={fileName} className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{fileName}</span>
                        <span className="text-sm font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-recruiter-primary h-2 rounded-full" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isUploading && Object.keys(uploadProgress).length === 0 && (
              <div className="mt-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-2 text-gray-600">Processing resumes...</p>
              </div>
            )}

            {parsedCandidates.length > 0 && !isUploading && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Parsed Candidates</h3>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedCandidates.map((candidate) => (
                        <TableRow key={candidate.id}>
                          <TableCell className="font-medium">{candidate.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.slice(0, 3).map((skill: string) => (
                                <span 
                                  key={skill} 
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {skill}
                                </span>
                              ))}
                              {candidate.skills.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{candidate.skills.length - 3}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{candidate.experience}</TableCell>
                          <TableCell>{candidate.location}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Parsed
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button asChild>
                    <a href="/search">Continue to Search</a>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadPage;
