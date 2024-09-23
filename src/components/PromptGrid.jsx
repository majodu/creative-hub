import React from 'react';
import PromptCard from './PromptCard';

const PromptGrid = ({ prompts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} {...prompt} />
      ))}
    </div>
  );
};

export default PromptGrid;
