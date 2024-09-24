import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, ArchiveRestore } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getArchivedPrompts, unarchivePrompt } from '../utils/indexedDB';
import { toast } from 'sonner';

const Archive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: archivedPrompts, isLoading, error } = useQuery({
    queryKey: ['archivedPrompts', searchTerm],
    queryFn: () => getArchivedPrompts(searchTerm),
    retry: 1,
    onError: (error) => {
      console.error('Error fetching archived prompts:', error);
    },
  });

  const unarchiveMutation = useMutation({
    mutationFn: unarchivePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries(['archivedPrompts']);
      queryClient.invalidateQueries(['prompts']);
      queryClient.invalidateQueries(['recentlyArchivedPrompts']);
      toast.success('Prompt unarchived successfully');
    },
    onError: (error) => {
      console.error('Error unarchiving prompt:', error);
      toast.error('Failed to unarchive prompt. Please try again.');
    },
  });

  const handleBack = () => {
    navigate('/');
  };

  const handleUnarchive = (promptId) => {
    unarchiveMutation.mutate(promptId);
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
          <div key={prompt.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">{prompt.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{prompt.prompt.substring(0, 100)}...</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">
                Archived: {new Date(prompt.archivedAt).toLocaleDateString()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUnarchive(prompt.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <ArchiveRestore className="mr-2 h-4 w-4" />
                Unarchive
              </Button>
            </div>
          </div>
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
