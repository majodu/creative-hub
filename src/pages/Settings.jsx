import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon } from 'lucide-react';
import { secureStore } from '../utils/secureStorage';
import { toast } from 'sonner';

const Settings = () => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [defaultPrompt, setDefaultPrompt] = useState('');
  const [defaultModel, setDefaultModel] = useState('gpt-3.5-turbo');

  useEffect(() => {
    const loadSettings = async () => {
      const storedOpenaiKey = await secureStore.getItem('openaiKey');
      const storedDefaultPrompt = await secureStore.getItem('defaultPrompt');
      const storedDefaultModel = await secureStore.getItem('defaultModel');
      if (storedOpenaiKey) {
        setOpenaiKey(storedOpenaiKey);
      }
      if (storedDefaultPrompt) {
        setDefaultPrompt(storedDefaultPrompt);
      }
      if (storedDefaultModel) {
        setDefaultModel(storedDefaultModel);
      }
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await secureStore.setItem('openaiKey', openaiKey);
    await secureStore.setItem('defaultPrompt', defaultPrompt);
    await secureStore.setItem('defaultModel', defaultModel);
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
        <div className="space-y-2">
          <Label htmlFor="defaultModel">Default Model</Label>
          <Select value={defaultModel} onValueChange={setDefaultModel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-4-32k">GPT-4 32k</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default Settings;
