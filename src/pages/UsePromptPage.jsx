import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPromptById } from '../utils/indexedDB';
import { ArrowLeft } from 'lucide-react';

const UsePromptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [variables, setVariables] = useState({});
  const [filledPrompt, setFilledPrompt] = useState('');
  const [editablePrompt, setEditablePrompt] = useState('');

  const { data: promptData, isLoading, error } = useQuery({
    queryKey: ['prompt', id],
    queryFn: () => getPromptById(parseInt(id)),
  });

  useEffect(() => {
    if (promptData) {
      const extractedVariables = extractVariables(promptData.prompt);
      setVariables(extractedVariables);
      updateFilledPrompt(promptData.prompt, extractedVariables);
    }
  }, [promptData]);

  const extractVariables = (prompt) => {
    const regex = /\{\$([A-Z_]+)\}/g;
    const matches = prompt.match(regex) || [];
    return matches.reduce((acc, match) => {
      const variable = match.slice(2, -1);
      acc[variable] = '';
      return acc;
    }, {});
  };

  const handleInputChange = (variable, value) => {
    setVariables(prev => {
      const updatedVariables = { ...prev, [variable]: value };
      updateFilledPrompt(promptData.prompt, updatedVariables);
      return updatedVariables;
    });
  };

  const updateFilledPrompt = (template, updatedVariables) => {
    let newFilledPrompt = template;
    Object.entries(updatedVariables).forEach(([variable, value]) => {
      const regex = new RegExp(`\\{\\$${variable}\\}`, 'g');
      newFilledPrompt = newFilledPrompt.replace(regex, value);
    });
    setFilledPrompt(newFilledPrompt);
    setEditablePrompt(newFilledPrompt);
  };

  const handleEditablePromptChange = (e) => {
    setEditablePrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/chat', { state: { initialMessage: editablePrompt } });
  };

  const handleBack = () => {
    navigate(`/edit-prompt/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading prompt: {error.message}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-2xl font-bold mb-6">Use Prompt Template</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(variables).map(([variable, value]) => (
          <div key={variable}>
            <Label htmlFor={variable}>{variable}</Label>
            <Input
              id={variable}
              value={value}
              onChange={(e) => handleInputChange(variable, e.target.value)}
              placeholder={`Enter ${variable.toLowerCase().replace('_', ' ')}`}
            />
          </div>
        ))}
        <div>
          <Label htmlFor="editablePrompt">Editable Filled Prompt</Label>
          <Textarea
            id="editablePrompt"
            value={editablePrompt}
            onChange={handleEditablePromptChange}
            rows={6}
            className="mt-1"
          />
        </div>
        <Button type="submit">Send to Chat</Button>
      </form>
    </div>
  );
};

export default UsePromptPage;
