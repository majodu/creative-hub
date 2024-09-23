import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon } from 'lucide-react';
import { secureStore } from '../utils/secureStorage';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openaiKey, setOpenaiKey] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const storedOpenaiKey = await secureStore.getItem('openaiKey');
      if (storedOpenaiKey) {
        setOpenaiKey(storedOpenaiKey);
      }
      // Load other settings here
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await secureStore.setItem('openaiKey', openaiKey);
    // Save other settings here
    console.log('Settings updated:', { username, email, notifications, darkMode, openaiKey });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <SettingsIcon className="mr-2" /> Settings
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Your username" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Your email" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="openaiKey">OpenAI API Key</Label>
          <Input 
            id="openaiKey" 
            type="password" 
            value={openaiKey} 
            onChange={(e) => setOpenaiKey(e.target.value)} 
            placeholder="Your OpenAI API Key" 
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="notifications" 
            checked={notifications} 
            onCheckedChange={setNotifications} 
          />
          <Label htmlFor="notifications">Enable notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="darkMode" 
            checked={darkMode} 
            onCheckedChange={setDarkMode} 
          />
          <Label htmlFor="darkMode">Dark mode</Label>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default Settings;
