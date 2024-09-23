import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (message.trim()) {
      // Navigate to the new prompt page
      navigate('/new-prompt', { state: { initialPrompt: message } });
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex items-center bg-white rounded-lg shadow-lg max-w-2xl w-full border border-gray-300">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your template description here..."
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
