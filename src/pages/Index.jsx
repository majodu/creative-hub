import React from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import TabNavigation from '../components/TabNavigation';
import PromptCard from '../components/PromptCard';

const Index = () => {
  const samplePrompt = {
    title: "Blog Intro",
    description: "Let's start with a compelling intro that hooks your readers from the get-go and kick your blog up a notch!",
    likes: 34,
    tags: ["Branding", "Marketing"]
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-8">
          <SearchBar />
        </div>
        <div className="mb-8">
          <TabNavigation />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PromptCard {...samplePrompt} />
          {/* You can add more PromptCards here */}
        </div>
      </main>
    </div>
  );
};

export default Index;
