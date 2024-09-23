import React from 'react';
import { Sparkles } from 'lucide-react';

const GeneratePromptButton = () => {
  const handleGeneratePrompt = () => {
    // TODO: Implement prompt generation logic
    console.log('Generate prompt clicked');
  };

  return (
    <button
      onClick={handleGeneratePrompt}
      className="fixed bottom-6 right-6 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300 flex items-center space-x-2"
    >
      <Sparkles className="w-5 h-5" />
      <span>Generate prompt</span>
    </button>
  );
};

export default GeneratePromptButton;