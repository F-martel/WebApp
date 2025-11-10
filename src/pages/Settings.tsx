import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Upload, CheckCircle2, Clock, AlertCircle, Monitor } from "lucide-react";
import { toast } from "sonner";

// Mock user data
const userData = {
  name: "John Doe",
  email: "john@example.com",
  country: "United States",
};

const kycSteps = [
  { id: 1, title: "Basic Information", completed: true, icon: User },
  { id: 2, title: "ID Verification", completed: true, icon: CheckCircle2 },
  { id: 3, title: "Proof of Address", completed: false, icon: Clock },
];

const loginSessions = [
  { device: "Chrome on MacBook Pro", location: "New York, US", time: "2 hours ago", current: true },
  { device: "Safari on iPhone", location: "New York, US", time: "1 day ago", current: false },
  { device: "Chrome on Windows", location: "New York, US", time: "3 days ago", current: false },
];

const Settings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const kycProgress = (kycSteps.filter((step) => step.completed).length / kycSteps.length) * 100;

  const handleFileUpload = () => {
    toast.success("Document uploaded successfully");
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(twoFactorEnabled ? "2FA disabled" : "2FA enabled");
  };

  return (
    <AppLayout pageTitle="Settings">
      <div className="p-6 space-y-6 animate-fade-in">
        {/* User Information */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={userData.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={userData.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" defaultValue={userData.country} />
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary-hover">Save Changes</Button>
          </CardContent>
        </Card>

        {/* KYC Progress */}
        <Card className="shadow-card border-2 border-accent/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Identity Verification (KYC)
              </CardTitle>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                {Math.round(kycProgress)}% Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Progress value={kycProgress} className="h-2" />
            </div>

            <div className="space-y-4">
              {kycSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border transition-smooth ${
                      step.completed
                        ? "bg-success/5 border-success/20"
                        : "bg-muted border-border hover:bg-muted/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-success text-success-foreground" : "bg-muted-foreground/20"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium">{step.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {step.completed ? "Completed" : "Pending"}
                          </div>
                        </div>
                      </div>
                      {!step.completed && (
                        <Button variant="outline" size="sm">
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Upload Section */}
            <div className="p-4 border-2 border-dashed border-border rounded-lg hover:border-accent transition-smooth">
              <div className="text-center space-y-3">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                <div>
                  <div className="font-medium mb-1">Upload Verification Documents</div>
                  <div className="text-sm text-muted-foreground">
                    Accepted: Government ID, Utility Bill, Bank Statement
                  </div>
                </div>
                <Button onClick={handleFileUpload} variant="outline" className="mt-2">
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong>Why verify?</strong> Complete verification to unlock higher transaction limits and access
                premium features.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </div>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} />
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive alerts for important account activity
                </div>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            {/* Change Password */}
            <div className="space-y-3">
              <Label>Change Password</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input type="password" placeholder="Current password" />
                <Input type="password" placeholder="New password" />
              </div>
              <Button variant="outline">Update Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Login Sessions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary" />
              Recent Login Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loginSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-smooth">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {session.device}
                      {session.current && (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {session.location} • {session.time}
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
