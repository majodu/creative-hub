import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import TabNavigation from '../components/TabNavigation';
import PromptGrid from '../components/PromptGrid';
import ChatInput from '../components/ChatInput';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const samplePrompts = [
    {
      title: "Blog Intro",
      description: "Let's start with a compelling intro that hooks your readers from the get-go and kick your blog up a notch!",
      likes: 34,
      tags: ["Branding", "Marketing"]
    },
    {
      title: "Product Description",
      description: "Create an engaging product description that highlights key features and benefits.",
      likes: 28,
      tags: ["E-commerce", "Copywriting"]
    },
    {
      title: "Social Media Post",
      description: "Craft a catchy social media post that drives engagement and increases followers.",
      likes: 42,
      tags: ["Social Media", "Marketing"]
    },
    {
      title: "Email Subject Line",
      description: "Generate attention-grabbing email subject lines to improve open rates.",
      likes: 19,
      tags: ["Email Marketing", "Copywriting"]
    },
    {
      title: "SEO Meta Description",
      description: "Write an optimized meta description to improve click-through rates from search results.",
      likes: 31,
      tags: ["SEO", "Web Content"]
    },
    {
      title: "Video Script Outline",
      description: "Create a structured outline for an informative and engaging video script.",
      likes: 23,
      tags: ["Video Content", "Scriptwriting"]
    }
  ];

  const filteredPrompts = samplePrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

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
