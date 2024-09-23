import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleGenerate = () => {
    if (message.trim()) {
      // TODO: Implement generating response from chatbot
      console.log('Generating response for:', message);
      setMessage('');
    }
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center">
      <div className="flex items-center bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your prompt here..."
          className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleGenerate}
          className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          <span>Generate</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
