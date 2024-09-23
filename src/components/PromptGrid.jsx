import React from 'react';
import PromptCard from './PromptCard';

const PromptGrid = ({ prompts, onSelect, selectedPrompts = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <PromptCard 
          key={prompt.id} 
          {...prompt} 
          onSelect={onSelect}
          isSelected={selectedPrompts.includes(prompt.id)}
        />
      ))}
    </div>
  );
};

export default PromptGrid;
