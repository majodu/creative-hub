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
    <main className="flex-1 flex flex-col h-full">
      <div className="flex-grow overflow-auto p-6">
        <div className="mb-4 w-full">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleBookmarkFilter}
            className={`flex items-center space-x-2 text-xs ${showBookmarked ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <BookmarkIcon className="h-3 w-3" />
            <span>{showBookmarked ? "Show All" : "Show Bookmarked"}</span>
          </Button>
          <ExportWidget 
            selectedPrompts={selectedPrompts} 
            prompts={prompts}
            className="text-xs text-gray-500 hover:text-gray-700"
          />
        </div>
        <PromptGrid 
          prompts={filteredPrompts} 
          onSelect={handlePromptSelection}
          selectedPrompts={selectedPrompts}
        />
      </div>
      <div className="p-6 bg-white border-t">
        <ChatInput />
      </div>
    </main>
  );
};

export default Index;
