
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Send, Eye, CheckCircle, Clock } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  selected: boolean;
  progress: number;
  status: 'pending' | 'sent' | 'waiting' | 'completed';
}

const InitiateBackgroundCheck = () => {
  const navigate = useNavigate();
  const [checkType, setCheckType] = useState<string[]>([]);
  const [emailTemplate, setEmailTemplate] = useState(`Dear [Contact Name],

We are conducting a background verification for [Employee Name] who has applied for the position of [Role] at our organization.

Could you please confirm the following details:
- Employment/Education period
- Position/Degree held
- Performance/Academic standing

Please reply to this email with the verification details.

Thank you for your cooperation.

Best regards,
HR Team`);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya.sharma@company.com',
      role: 'Software Engineer',
      selected: false,
      progress: 0,
      status: 'pending'
    },
    {
      id: '2',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@company.com',
      role: 'Product Manager',
      selected: false,
      progress: 0,
      status: 'pending'
    },
    {
      id: '3',
      name: 'Anita Singh',
      email: 'anita.singh@company.com',
      role: 'Designer',
      selected: false,
      progress: 0,
      status: 'pending'
    }
  ]);

  const handleEmployeeSelection = (employeeId: string) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId ? { ...emp, selected: !emp.selected } : emp
      )
    );
  };

  const handleCheckTypeChange = (type: string) => {
    setCheckType(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleStartCheck = () => {
    const selectedEmployees = employees.filter(emp => emp.selected);
    
    if (selectedEmployees.length === 0) {
      alert('Please select at least one employee');
      return;
    }
    
    if (checkType.length === 0) {
      alert('Please select at least one check type');
      return;
    }

    // Simulate starting checks
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.selected) {
          return { ...emp, status: 'sent', progress: 25 };
        }
        return emp;
      })
    );

    // Simulate progress updates
    setTimeout(() => {
      setEmployees(prev =>
        prev.map(emp => {
          if (emp.selected && emp.status === 'sent') {
            return { ...emp, status: 'waiting', progress: 60 };
          }
          return emp;
        })
      );
    }, 2000);
  };

  const getStatusBadge = (status: Employee['status']) => {
    const config = {
      pending: { label: 'Pending', className: 'bg-gray-100 text-gray-800' },
      sent: { label: 'Sent', className: 'bg-blue-100 text-blue-800' },
      waiting: { label: 'Waiting Response', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800' }
    };
    
    return config[status];
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
        
        <h1 className="text-3xl font-bold mb-2">Initiate Background Check</h1>
        <p className="text-gray-600">
          Select employees and configure verification settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Employees</CardTitle>
              <CardDescription>
                Choose employees for background verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div key={employee.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={employee.selected}
                      onCheckedChange={() => handleEmployeeSelection(employee.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.role}</p>
                        </div>
                        <Badge className={getStatusBadge(employee.status).className}>
                          {getStatusBadge(employee.status).label}
                        </Badge>
                      </div>
                      {employee.progress > 0 && (
                        <div className="mt-2">
                          <Progress value={employee.progress} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{employee.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Check Type</CardTitle>
              <CardDescription>
                Select what to verify for the selected employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={checkType.includes('education')}
                    onCheckedChange={() => handleCheckTypeChange('education')}
                  />
                  <label className="text-sm font-medium">Education Verification</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={checkType.includes('employment')}
                    onCheckedChange={() => handleCheckTypeChange('employment')}
                  />
                  <label className="text-sm font-medium">Employment Verification</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={checkType.includes('both')}
                    onCheckedChange={() => handleCheckTypeChange('both')}
                  />
                  <label className="text-sm font-medium">Both Education & Employment</label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Template</CardTitle>
              <CardDescription>
                Customize the verification email template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                />
                <Button variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview Email
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Selected Employees:</span>
                  <span className="text-sm font-medium">
                    {employees.filter(emp => emp.selected).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Check Types:</span>
                  <span className="text-sm font-medium">
                    {checkType.length > 0 ? checkType.join(', ') : 'None selected'}
                  </span>
                </div>
                <Button 
                  onClick={handleStartCheck}
                  className="w-full gap-2"
                  disabled={employees.filter(emp => emp.selected).length === 0 || checkType.length === 0}
                >
                  <Send className="h-4 w-4" />
                  Start Background Check
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InitiateBackgroundCheck;
