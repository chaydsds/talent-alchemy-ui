
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, Mail, Clock, CheckCircle, AlertTriangle, User } from 'lucide-react';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock employee data
  const employee = {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@company.com',
    role: 'Software Engineer',
    department: 'Engineering',
    joiningDate: '2025-05-20',
    status: 'verified'
  };

  const auditTrail = [
    {
      id: '1',
      action: 'Background check initiated',
      timestamp: '2025-05-25 10:00:00',
      user: 'System',
      details: 'Education and employment verification started'
    },
    {
      id: '2',
      action: 'Education verification completed',
      timestamp: '2025-05-26 14:30:00',
      user: 'AI Verifier',
      details: 'B.Tech degree verified from ABC University'
    },
    {
      id: '3',
      action: 'Employment verification completed',
      timestamp: '2025-05-27 09:15:00',
      user: 'AI Verifier',
      details: 'Previous employment at XYZ Corp verified'
    },
    {
      id: '4',
      action: 'Status updated to Verified',
      timestamp: '2025-05-27 09:16:00',
      user: 'System',
      details: 'All checks passed successfully'
    }
  ];

  const educationRecords = [
    {
      id: '1',
      degree: 'Bachelor of Technology',
      institution: 'ABC University',
      year: '2020-2024',
      status: 'verified',
      documents: ['Degree Certificate', 'Transcript'],
      verificationEmail: 'registrar@abcuniversity.edu'
    }
  ];

  const employmentRecords = [
    {
      id: '1',
      company: 'XYZ Corp',
      position: 'Junior Software Engineer',
      duration: '2024-2025',
      status: 'verified',
      documents: ['Experience Letter', 'Payslips'],
      verificationEmail: 'hr@xyzcorp.com'
    }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      unverified: { label: 'Unverified', className: 'bg-gray-100 text-gray-800' },
      'in-progress': { label: 'In Progress', className: 'bg-blue-100 text-blue-800' },
      verified: { label: 'Verified', className: 'bg-green-100 text-green-800' },
      suspicious: { label: 'Suspicious', className: 'bg-yellow-100 text-yellow-800' },
      critical: { label: 'Critical Issue', className: 'bg-red-100 text-red-800' }
    };
    
    return config[status as keyof typeof config] || config.unverified;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/background-checks')}
          className="gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{employee.name}</h1>
            <p className="text-gray-600">{employee.role} • {employee.department}</p>
          </div>
          <Badge className={getStatusBadge(employee.status).className}>
            {getStatusBadge(employee.status).label}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm">{employee.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Joining Date</label>
                  <p className="text-sm">{new Date(employee.joiningDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Department</label>
                  <p className="text-sm">{employee.department}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Verification Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Education Verification</span>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Employment Verification</span>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Updated</span>
                  <span className="text-sm text-gray-500">May 27, 2025</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          {educationRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{record.degree}</CardTitle>
                    <CardDescription>{record.institution} • {record.year}</CardDescription>
                  </div>
                  <Badge className={getStatusBadge(record.status).className}>
                    {getStatusBadge(record.status).label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Documents Uploaded</h4>
                    <div className="space-y-2">
                      {record.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-gray-400" />
                          {doc}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Verification Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {record.verificationEmail}
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Mail className="h-4 w-4" />
                        View Email Thread
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="employment" className="space-y-6">
          {employmentRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{record.position}</CardTitle>
                    <CardDescription>{record.company} • {record.duration}</CardDescription>
                  </div>
                  <Badge className={getStatusBadge(record.status).className}>
                    {getStatusBadge(record.status).label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Documents Uploaded</h4>
                    <div className="space-y-2">
                      {record.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-gray-400" />
                          {doc}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Verification Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {record.verificationEmail}
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Mail className="h-4 w-4" />
                        View Email Thread
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Audit Trail
              </CardTitle>
              <CardDescription>
                Complete timeline of all actions and status changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditTrail.map((entry, index) => (
                  <div key={entry.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{entry.action}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{entry.details}</p>
                      <p className="text-xs text-gray-500">by {entry.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDetails;
