
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Check, Mail, LockKeyhole, AlertCircle, Shield } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const EmailSetup = () => {
  const [provider, setProvider] = useState<'gmail' | 'outlook' | 'custom'>('gmail');
  const [agreed, setAgreed] = useState(false);
  const [customSettings, setCustomSettings] = useState({
    server: '',
    port: '',
    username: '',
    password: '',
    ssl: true
  });
  const navigate = useNavigate();

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      toast.error("Please agree to the consent terms before connecting");
      return;
    }
    
    // This would normally connect to the email provider's OAuth flow
    toast.success(`Successfully connected to ${provider === 'custom' ? 'custom email' : provider}`);
    
    // After successful connection, redirect to the appropriate page
    setTimeout(() => {
      navigate('/search');
    }, 2000);
  };

  const handleProviderChange = (value: string) => {
    setProvider(value as 'gmail' | 'outlook' | 'custom');
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Connect Your Email</h1>
          <p className="text-gray-600">
            To verify backgrounds and send outreach messages authentically, we need secure access to your inbox
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="h-5 w-5" />
              Grant Access to Your Inbox for Automated Checks
            </CardTitle>
            <CardDescription>
              To verify backgrounds authentically, we'll scan your email for references, offer letters, and send formal verifications directly.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleConnect} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Step 1: Choose Email Provider</h3>
                
                <Tabs value={provider} onValueChange={handleProviderChange} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="gmail" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">G</div>
                      Gmail
                    </TabsTrigger>
                    <TabsTrigger value="outlook" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">O</div>
                      Outlook
                    </TabsTrigger>
                    <TabsTrigger value="custom" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs">⚙️</div>
                      Custom
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="gmail" className="pt-4">
                    <Button type="button" className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">G</div>
                      Sign in with Google
                    </Button>
                    <div className="mt-2 text-sm text-gray-500">
                      Connect securely with Google OAuth. No passwords stored.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="outlook" className="pt-4">
                    <Button type="button" className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-blue-500 text-xs">O</div>
                      Sign in with Outlook
                    </Button>
                    <div className="mt-2 text-sm text-gray-500">
                      Connect securely with Microsoft OAuth. No passwords stored.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="custom" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="server">Mail Server</Label>
                        <Input 
                          id="server" 
                          placeholder="mail.example.com" 
                          value={customSettings.server}
                          onChange={(e) => setCustomSettings({...customSettings, server: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="port">Port</Label>
                        <Input 
                          id="port" 
                          placeholder="993" 
                          value={customSettings.port}
                          onChange={(e) => setCustomSettings({...customSettings, port: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Email Address</Label>
                      <Input 
                        id="username" 
                        placeholder="you@example.com" 
                        type="email"
                        value={customSettings.username}
                        onChange={(e) => setCustomSettings({...customSettings, username: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">App Password</Label>
                      <Input 
                        id="password" 
                        placeholder="Your app-specific password" 
                        type="password"
                        value={customSettings.password}
                        onChange={(e) => setCustomSettings({...customSettings, password: e.target.value})}
                      />
                      <p className="text-xs text-gray-500">
                        Use an app-specific password rather than your account password for better security.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="ssl" 
                        checked={customSettings.ssl}
                        onCheckedChange={(checked) => 
                          setCustomSettings({...customSettings, ssl: checked as boolean})
                        }
                      />
                      <Label htmlFor="ssl">Use SSL/TLS</Label>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Step 2: What Access You're Granting</h3>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Read specific emails related to employment, references, or HR</p>
                      <p className="text-sm text-gray-500">We only access emails related to job applications and references</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Send emails to referees or employers for verification</p>
                      <p className="text-sm text-gray-500">Automated outreach will be sent from your email address</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Your data is stored securely. You're in full control.</p>
                      <p className="text-sm text-gray-500">You can revoke access at any time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">We never spam or share your email content</p>
                      <p className="text-sm text-gray-500">Your privacy is our top priority</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Security Note:</strong> All data is encrypted in transit and at rest. We use industry-standard OAuth protocols and never store your credentials.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Step 3: Consent</h3>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="consent" 
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  />
                  <Label htmlFor="consent" className="text-sm">
                    I agree to allow PeopleGPT to access and scan my inbox for background verification purposes and to send emails on my behalf for recruitment activities.
                  </Label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!agreed}
              >
                Connect My Email Securely
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailSetup;
