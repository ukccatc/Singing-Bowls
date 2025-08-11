import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Save, Globe, Mail, CreditCard, Shield } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your store configuration</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <div className="flex space-x-1 border-b">
        <Button variant="ghost" className="border-b-2 border-blue-500">
          General
        </Button>
        <Button variant="ghost">
          Email
        </Button>
        <Button variant="ghost">
          Payment
        </Button>
        <Button variant="ghost">
          Security
        </Button>
      </div>

      {/* General Settings */}
      <div className="space-y-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Store Information</span>
            </CardTitle>
            <CardDescription>Basic information about your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="Himalayan Sound" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Store Email</Label>
                <Input id="store-email" type="email" defaultValue="info@himalayansound.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-description">Store Description</Label>
              <Textarea 
                id="store-description" 
                defaultValue="Authentic Nepali singing bowls and sound meditation instruments"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-phone">Phone Number</Label>
                <Input id="store-phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-address">Address</Label>
                <Input id="store-address" defaultValue="123 Meditation St, Peace City, PC 12345" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Email Configuration</span>
            </CardTitle>
            <CardDescription>Configure email notifications and templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" defaultValue="smtp.gmail.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input id="smtp-port" defaultValue="587" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-username">SMTP Username</Label>
                <Input id="smtp-username" defaultValue="noreply@himalayansound.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP Password</Label>
                <Input id="smtp-password" type="password" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="email-notifications" defaultChecked />
              <Label htmlFor="email-notifications">Enable email notifications</Label>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Configuration</span>
            </CardTitle>
            <CardDescription>Configure payment gateways and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stripe-key">Stripe Public Key</Label>
                <Input id="stripe-key" defaultValue="pk_test_..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                <Input id="stripe-secret" type="password" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="stripe-enabled" defaultChecked />
              <Label htmlFor="stripe-enabled">Enable Stripe payments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="paypal-enabled" />
              <Label htmlFor="paypal-enabled">Enable PayPal payments</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Input id="currency" defaultValue="USD" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
            <CardDescription>Configure security and access controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="two-factor" />
              <Label htmlFor="two-factor">Enable two-factor authentication</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="session-timeout" defaultChecked />
              <Label htmlFor="session-timeout">Enable session timeout</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-duration">Session Timeout (minutes)</Label>
              <Input id="session-duration" type="number" defaultValue="30" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="rate-limiting" defaultChecked />
              <Label htmlFor="rate-limiting">Enable rate limiting</Label>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Mode */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Mode</CardTitle>
            <CardDescription>Put your store in maintenance mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="maintenance-mode" />
              <Label htmlFor="maintenance-mode">Enable maintenance mode</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance-message">Maintenance Message</Label>
              <Textarea 
                id="maintenance-message" 
                defaultValue="We're currently performing maintenance. Please check back soon."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allowed-ips">Allowed IPs (comma-separated)</Label>
              <Input id="allowed-ips" placeholder="192.168.1.1, 10.0.0.1" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
