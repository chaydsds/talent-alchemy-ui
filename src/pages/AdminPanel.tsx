
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, CheckCircle, FileText, Eye, MessageSquare } from 'lucide-react';

interface FlaggedCheck {
  id: string;
  employeeName: string;
  checkType: string;
  status: 'suspicious' | 'critical';
  issue: string;
  flaggedDate: string;
  reviewer?: string;
  notes?: string;
}

const AdminPanel = () => {
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  const flaggedChecks: FlaggedCheck[] = [
    {
      id: '1',
      employeeName: 'Anita Singh',
      checkType: 'Education',
      status: 'suspicious',
      issue: 'University response indicates different graduation year',
      flaggedDate: '2025-05-26',
      notes: 'Employee claims 2023, university says 2024'
    },
    {
      id: '2',
      employeeName: 'Vikram Patel',
      checkType: 'Employment',
      status: 'critical',
      issue: 'Previous employer denies employment record',
      flaggedDate: '2025-05-25',
      notes: 'Company HR confirmed no record of employment'
    },
    {
      id: '3',
      employeeName: 'Rajesh Kumar',
      checkType: 'Education',
      status: 'suspicious',
      issue: 'Delayed response from institution',
      flaggedDate: '2025-05-24'
    }
  ];

  const handleStatusUpdate = (checkId: string, newStatus: string) => {
    console.log(`Updating check ${checkId} to status: ${newStatus}`);
    // Here you would update the status in your backend
  };

  const handleBulkApproval = () => {
    console.log(`Bulk approving checks: ${selectedChecks}`);
    // Here you would handle bulk approval
  };

  const handleNotesUpdate = (checkId: string, noteText: string) => {
    setNotes(prev => ({ ...prev, [checkId]: noteText }));
  };

  const getStatusBadge = (status: 'suspicious' | 'critical') => {
    const config = {
      suspicious: { label: 'Suspicious', className: 'bg-yellow-100 text-yellow-800' },
      critical: { label: 'Critical Issue', className: 'bg-red-100 text-red-800' }
    };
    
    return config[status];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Review Panel</h1>
        <p className="text-gray-600">
          Review and manage flagged background checks requiring attention
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Flagged Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{flaggedChecks.length}</div>
            <div className="text-sm text-gray-500">Require review</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Critical Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {flaggedChecks.filter(check => check.status === 'critical').length}
            </div>
            <div className="text-sm text-gray-500">High priority</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {flaggedChecks.filter(check => !check.reviewer).length}
            </div>
            <div className="text-sm text-gray-500">Unassigned</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Flagged Background Checks
              </CardTitle>
              <CardDescription>
                Review checks that require manual attention
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleBulkApproval}
                disabled={selectedChecks.length === 0}
              >
                Bulk Approve ({selectedChecks.length})
              </Button>
              <Button variant="outline">
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Check Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Flagged Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flaggedChecks.map((check) => (
                <TableRow key={check.id}>
                  <TableCell className="font-medium">{check.employeeName}</TableCell>
                  <TableCell>{check.checkType}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(check.status).className}>
                      {getStatusBadge(check.status).label}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{check.issue}</TableCell>
                  <TableCell>{new Date(check.flaggedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        Review
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-semibold">Detailed Review</h2>
        
        {flaggedChecks.map((check) => (
          <Card key={check.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{check.employeeName}</CardTitle>
                  <CardDescription>{check.checkType} Verification Issue</CardDescription>
                </div>
                <Badge className={getStatusBadge(check.status).className}>
                  {getStatusBadge(check.status).label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Issue Description</h4>
                <p className="text-sm text-gray-600">{check.issue}</p>
              </div>
              
              {check.notes && (
                <div>
                  <h4 className="font-medium mb-2">Existing Notes</h4>
                  <p className="text-sm text-gray-600">{check.notes}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-2">Reviewer Notes</h4>
                <Textarea
                  placeholder="Add your review notes here..."
                  value={notes[check.id] || ''}
                  onChange={(e) => handleNotesUpdate(check.id, e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => handleStatusUpdate(check.id, 'verified')}
                  className="gap-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark as Verified
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleStatusUpdate(check.id, 'failed')}
                >
                  Mark as Failed
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" />
                  View Documents
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Contact Employee
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
