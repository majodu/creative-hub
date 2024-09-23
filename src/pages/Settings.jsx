import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon } from 'lucide-react';
import { secureStore } from '../utils/secureStorage';

const Settings = () => {
  const [openaiKey, setOpenaiKey] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const storedOpenaiKey = await secureStore.getItem('openaiKey');
      if (storedOpenaiKey) {
        setOpenaiKey(storedOpenaiKey);
      }
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await secureStore.setItem('openaiKey', openaiKey);
    console.log('Settings updated:', { openaiKey });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <SettingsIcon className="mr-2" /> Settings
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default Settings;
