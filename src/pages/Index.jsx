import React from 'react';
import Sidebar from '../components/Sidebar';

const Index = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to PromptKeeper</h1>
        <p className="text-lg">Start managing your prompts efficiently!</p>
      </main>
    </div>
  );
};

export default Index;
