
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Plus, FileText, Eye, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  onboardingDate: string;
  status: 'unverified' | 'in-progress' | 'verified' | 'suspicious' | 'critical';
}

const BackgroundChecks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Mock data
  const employees: Employee[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya.sharma@company.com',
      role: 'Software Engineer',
      onboardingDate: '2025-05-20',
      status: 'verified'
    },
    {
      id: '2',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@company.com',
      role: 'Product Manager',
      onboardingDate: '2025-05-18',
      status: 'in-progress'
    },
    {
      id: '3',
      name: 'Anita Singh',
      email: 'anita.singh@company.com',
      role: 'Designer',
      onboardingDate: '2025-05-15',
      status: 'suspicious'
    },
    {
      id: '4',
      name: 'Vikram Patel',
      email: 'vikram.patel@company.com',
      role: 'Data Scientist',
      onboardingDate: '2025-05-10',
      status: 'unverified'
    }
  ];

  const getStatusBadge = (status: Employee['status']) => {
    const config = {
      unverified: { label: 'Unverified', className: 'bg-gray-100 text-gray-800' },
      'in-progress': { label: 'In Progress', className: 'bg-blue-100 text-blue-800' },
      verified: { label: 'Verified', className: 'bg-green-100 text-green-800' },
      suspicious: { label: 'Suspicious', className: 'bg-yellow-100 text-yellow-800' },
      critical: { label: 'Critical Issue', className: 'bg-red-100 text-red-800' }
    };
    
    return config[status];
  };

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmployees(
      selectedEmployees.length === employees.length ? [] : employees.map(e => e.id)
    );
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Background Checks Dashboard</h1>
        <p className="text-gray-600">
          Manage and track employee background verification process
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {employees.filter(e => e.status === 'verified').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {employees.filter(e => e.status === 'in-progress').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {employees.filter(e => e.status === 'suspicious' || e.status === 'critical').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Employee Background Checks</CardTitle>
              <CardDescription>
                Track verification status for all onboarded employees
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => navigate('/background-checks/initiate')}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Start Background Check
              </Button>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {selectedEmployees.length > 0 && (
              <Badge variant="secondary">
                {selectedEmployees.length} selected
              </Badge>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedEmployees.length === employees.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Onboarding Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedEmployees.includes(employee.id)}
                      onCheckedChange={() => handleSelectEmployee(employee.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{new Date(employee.onboardingDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(employee.status).className}>
                      {getStatusBadge(employee.status).label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/background-checks/employee/${employee.id}`)}
                        className="gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        Audit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackgroundChecks;
