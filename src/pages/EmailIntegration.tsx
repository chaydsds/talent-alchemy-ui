
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Mail, Settings, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

const EmailIntegration = () => {
  const [emailConfig, setEmailConfig] = useState({
    server: '',
    port: '',
    username: '',
    password: '',
    ssl: true
  });

  const [templates, setTemplates] = useState([
    {
      id: '1',
      name: 'Education Verification',
      subject: 'Background Verification Request - [Employee Name]',
      body: `Dear Registrar,

We are conducting a background verification for [Employee Name] who has applied for a position at our organization.

Could you please confirm the following educational details:
- Degree: [Degree Name]
- Duration: [Start Year] - [End Year]
- Academic standing/GPA if available

Please reply to this email with the verification details.

Thank you for your cooperation.

Best regards,
HR Team`,
      status: 'active'
    },
    {
      id: '2',
      name: 'Employment Verification',
      subject: 'Employment Verification Request - [Employee Name]',
      body: `Dear HR Team,

We are conducting an employment verification for [Employee Name] who has applied for a position at our organization.

Could you please confirm the following employment details:
- Position held: [Position]
- Employment period: [Start Date] - [End Date]
- Performance/Standing during employment

Please reply to this email with the verification details.

Thank you for your cooperation.

Best regards,
HR Team`,
      status: 'active'
    }
  ]);

  const handleConfigChange = (field: string, value: string | boolean) => {
    setEmailConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveConfig = () => {
    console.log('Saving email configuration:', emailConfig);
    // Here you would save the configuration
  };

  const handleTemplateUpdate = (templateId: string, field: string, value: string) => {
    setTemplates(prev =>
      prev.map(template =>
        template.id === templateId ? { ...template, [field]: value } : template
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Email Integration</h1>
        <p className="text-gray-600">
          Configure email settings and manage verification templates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Email Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <div className="text-sm text-gray-500">Active templates</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Auto Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Enabled</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="config" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config">Email Configuration</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="responses">Auto Responses</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                SMTP/IMAP Configuration
              </CardTitle>
              <CardDescription>
                Configure your email server settings for sending and receiving verification emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="server">Mail Server</Label>
                  <Input
                    id="server"
                    placeholder="mail.company.com"
                    value={emailConfig.server}
                    onChange={(e) => handleConfigChange('server', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    placeholder="993"
                    value={emailConfig.port}
                    onChange={(e) => handleConfigChange('port', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Email Address</Label>
                <Input
                  id="username"
                  type="email"
                  placeholder="hr@company.com"
                  value={emailConfig.username}
                  onChange={(e) => handleConfigChange('username', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">App Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your app-specific password"
                  value={emailConfig.password}
                  onChange={(e) => handleConfigChange('password', e.target.value)}
                />
              </div>

              <Button onClick={handleSaveConfig} className="gap-2">
                <Settings className="h-4 w-4" />
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>Email template for {template.name.toLowerCase()}</CardDescription>
                  </div>
                  <Badge 
                    className={
                      template.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {template.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`subject-${template.id}`}>Subject Line</Label>
                  <Input
                    id={`subject-${template.id}`}
                    value={template.subject}
                    onChange={(e) => handleTemplateUpdate(template.id, 'subject', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`body-${template.id}`}>Email Body</Label>
                  <Textarea
                    id={`body-${template.id}`}
                    rows={8}
                    value={template.body}
                    onChange={(e) => handleTemplateUpdate(template.id, 'body', e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Test Template
                  </Button>
                  <Button size="sm">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="responses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Auto Response Analysis
              </CardTitle>
              <CardDescription>
                Configure AI-powered analysis of incoming verification responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Detection Keywords</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Confirmed, Verified, Yes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Denied, No, Cannot confirm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Partial, Limited access</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Auto Actions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Update status automatically</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Flag suspicious responses</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Link to employee records</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="gap-2">
                <Settings className="h-4 w-4" />
                Configure AI Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailIntegration;
