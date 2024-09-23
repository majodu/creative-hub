import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings as SettingsIcon } from 'lucide-react';
import { secureStore } from '../utils/secureStorage';
import { toast } from 'sonner';

const Settings = () => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [defaultPrompt, setDefaultPrompt] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const storedOpenaiKey = await secureStore.getItem('openaiKey');
      const storedDefaultPrompt = await secureStore.getItem('defaultPrompt');
      if (storedOpenaiKey) {
        setOpenaiKey(storedOpenaiKey);
      }
      if (storedDefaultPrompt) {
        setDefaultPrompt(storedDefaultPrompt);
      }
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await secureStore.setItem('openaiKey', openaiKey);
    await secureStore.setItem('defaultPrompt', defaultPrompt);
    toast.success('Settings updated successfully');
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
        <div className="space-y-2">
          <Label htmlFor="defaultPrompt">Default Generation Prompt</Label>
          <Textarea 
            id="defaultPrompt" 
            value={defaultPrompt} 
            onChange={(e) => setDefaultPrompt(e.target.value)} 
            placeholder="Enter your default prompt for generation" 
            rows={4}
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default Settings;
