import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PromptGrid from '../components/PromptGrid';
import { getArchivedPrompts } from '../utils/indexedDB';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Archive = () => {
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const navigate = useNavigate();

  const { data: archivedPrompts, isLoading, error } = useQuery({
    queryKey: ['archivedPrompts'],
    queryFn: getArchivedPrompts,
  });

  const handlePromptSelection = (promptId) => {
    setSelectedPrompts(prev => 
      prev.includes(promptId) 
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    );
  };

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) return <div>Loading archived prompts...</div>;
  if (error) return <div>Error loading archived prompts: {error.message}</div>;

  return (
    <main className="flex-1 flex flex-col h-full p-6">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-4 self-start"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-2xl font-bold mb-6">Archived Prompts</h1>
      <PromptGrid 
        prompts={archivedPrompts} 
        onSelect={handlePromptSelection}
        selectedPrompts={selectedPrompts}
      />
    </main>
  );
};

export default Archive;