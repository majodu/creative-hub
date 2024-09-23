import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar';
import TabNavigation from '../components/TabNavigation';
import PromptGrid from '../components/PromptGrid';
import ChatInput from '../components/ChatInput';
import { getAllPrompts } from '../utils/indexedDB';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: prompts, isLoading, error } = useQuery({
    queryKey: ['prompts'],
    queryFn: getAllPrompts,
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPrompts = prompts
    ? prompts.filter(prompt =>
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  if (isLoading) return <div>Loading prompts...</div>;
  if (error) return <div>Error loading prompts: {error.message}</div>;

  return (
    <main className="flex-1 flex flex-col h-full">
      <div className="flex-grow overflow-auto p-6">
        <div className="mb-2 w-full">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="mb-2">
          <TabNavigation />
        </div>
        <PromptGrid prompts={filteredPrompts} />
      </div>
      <div className="p-6 bg-white border-t">
        <ChatInput />
      </div>
    </main>
  );
};

export default Index;
