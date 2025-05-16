
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { mockCandidates } from "@/lib/mock-data";

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [parsedCandidates, setParsedCandidates] = useState(mockCandidates.slice(0, 3));
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileUpload = (filesToUpload: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...filesToUpload]);
    setIsUploading(true);
    
    // Simulate parsing delay
    setTimeout(() => {
      setIsUploading(false);
      setParsedCandidates(mockCandidates);
      toast.success(`${filesToUpload.length} resume${filesToUpload.length > 1 ? 's' : ''} successfully parsed!`);
    }, 2000);
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
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

            {isUploading && (
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
                              {candidate.skills.slice(0, 3).map((skill) => (
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
                          <TableCell>{candidate.experience} years</TableCell>
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

export default Upload;
