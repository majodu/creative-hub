import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getArchivedPrompts } from '../utils/indexedDB';
import ArchiveCard from '../components/ArchiveCard';

const Archive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { data: archivedPrompts, isLoading, error } = useQuery({
    queryKey: ['archivedPrompts', searchTerm],
    queryFn: () => getArchivedPrompts(searchTerm),
    retry: 1,
    onError: (error) => {
      console.error('Error fetching archived prompts:', error);
    },
  });

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) return <div className="p-6">Loading archived prompts...</div>;
  if (error) return <div className="p-6">Error loading archived prompts. Please try refreshing the page.</div>;

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Archived Prompts</h1>
      </div>
      
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search archived prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
        {archivedPrompts && archivedPrompts.map((prompt) => (
          <ArchiveCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {archivedPrompts && archivedPrompts.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No archived prompts found.
        </div>
      )}
    </div>
  );
};

export default Archive;
