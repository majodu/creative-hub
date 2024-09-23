import React from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const Index = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <div className="mb-8">
          <SearchBar />
        </div>
        <div className="px-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to PromptKeeper</h1>
          <p className="text-lg">Start managing your prompts efficiently!</p>
          {/* Add more content here */}
        </div>
      </main>
    </div>
  );
};

export default Index;
