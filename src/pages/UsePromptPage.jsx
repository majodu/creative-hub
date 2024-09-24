import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getPromptById } from '../utils/indexedDB';
import { ArrowLeft } from 'lucide-react';

const UsePromptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [variables, setVariables] = useState({});
  const [filledPrompt, setFilledPrompt] = useState('');

  const { data: promptData, isLoading, error } = useQuery({
    queryKey: ['prompt', id],
    queryFn: () => getPromptById(parseInt(id)),
  });

  useEffect(() => {
    if (promptData) {
      const extractedVariables = extractVariables(promptData.prompt);
      setVariables(extractedVariables);
      setFilledPrompt(promptData.prompt);
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
    setVariables(prev => ({ ...prev, [variable]: value }));
    updateFilledPrompt(variable, value);
  };

  const updateFilledPrompt = (changedVariable, value) => {
    setFilledPrompt(prev => 
      prev.replace(new RegExp(`\\{\\$${changedVariable}\\}`, 'g'), value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/chat', { state: { initialMessage: filledPrompt } });
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
          <Label>Filled Prompt</Label>
          <div className="mt-1 p-2 bg-gray-100 rounded-md">{filledPrompt}</div>
        </div>
        <Button type="submit">Send to Chat</Button>
      </form>
    </div>
  );
};

export default UsePromptPage;