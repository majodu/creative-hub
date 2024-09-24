import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar';
import PromptGrid from '../components/PromptGrid';
import ChatInput from '../components/ChatInput';
import ExportWidget from '../components/ExportWidget';
import { getAllPrompts } from '../utils/indexedDB';
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [selectedPrompts, setSelectedPrompts] = useState([]);

  const { data: prompts, isLoading, error } = useQuery({
    queryKey: ['prompts'],
    queryFn: getAllPrompts,
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleBookmarkFilter = () => {
    setShowBookmarked(!showBookmarked);
  };

  const handlePromptSelection = (promptId) => {
    setSelectedPrompts(prev => 
      prev.includes(promptId) 
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    );
  };

  const filteredPrompts = prompts
    ? prompts.filter(prompt =>
        (prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
        (!showBookmarked || prompt.bookmarked)
      )
    : [];

  if (isLoading) return <div>Loading prompts...</div>;
  if (error) return <div>Error loading prompts: {error.message}</div>;

  return (
    <main className="flex flex-col h-screen">
      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="p-6">
          <div className="mb-4 w-full">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleBookmarkFilter}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              <BookmarkIcon className="h-3 w-3 mr-1" />
              <span>{showBookmarked ? "Show All" : "Show Bookmarked"}</span>
            </Button>
            {selectedPrompts.length > 0 && (
              <ExportWidget 
                selectedPrompts={selectedPrompts} 
                prompts={prompts}
                className="text-xs text-gray-500 hover:text-gray-700"
              />
            )}
          </div>
        </div>
        <div className="flex-grow overflow-y-auto px-6 pb-6">
          <PromptGrid 
            prompts={filteredPrompts} 
            onSelect={handlePromptSelection}
            selectedPrompts={selectedPrompts}
          />
        </div>
      </div>
      <div className="p-6 bg-white border-t">
        <ChatInput />
      </div>
    </main>
  );
};

export default Index;
