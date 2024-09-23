import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { savePrompt } from '../utils/indexedDB';
import { secureStore } from '../utils/secureStorage';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const PromptFormPage = () => {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialPrompt = async () => {
      if (location.state && location.state.initialPrompt !== undefined) {
        setPrompt(location.state.initialPrompt);
      } else {
        const defaultPrompt = await secureStore.getItem('defaultPrompt');
        if (defaultPrompt) {
          setPrompt(defaultPrompt);
        }
      }
    };
    loadInitialPrompt();
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await savePrompt({
        title,
        prompt,
        tags: tags.split(',').map(tag => tag.trim()),
        bookmarked: false
      });
      toast.success('Prompt saved successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving prompt:', error);
      toast.error('Failed to save prompt. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-2xl font-bold mb-6">New Prompt Template</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter prompt template title"
            required
          />
        </div>
        <div>
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here"
            rows={6}
            required
          />
        </div>
        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>
        <Button type="submit">Save Prompt Template</Button>
      </form>
    </div>
  );
};

export default PromptFormPage;
