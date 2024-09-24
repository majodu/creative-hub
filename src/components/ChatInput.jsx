import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateOpenAIResponse } from '../utils/openai';
import { toast } from 'sonner';

const ChatInput = ({ defaultTemplate }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (message.trim()) {
      setIsLoading(true);
      try {
        const promptWithTask = defaultTemplate.replace('{{task}}', message);
        const generatedResponse = await generateOpenAIResponse(promptWithTask);
        navigate('/new-prompt', { state: { initialPrompt: generatedResponse } });
      } catch (error) {
        console.error('Error generating response:', error);
        if (error.message.includes('API key not found')) {
          toast.error('OpenAI API key not found. Please set it in the Settings page.', {
            action: {
              label: 'Go to Settings',
              onClick: () => navigate('/settings')
            }
          });
        } else if (error.message.includes('Invalid OpenAI API key')) {
          toast.error('Invalid OpenAI API key. Please check your API key in the Settings page.', {
            action: {
              label: 'Go to Settings',
              onClick: () => navigate('/settings')
            }
          });
        } else {
          toast.error(error.message || 'Failed to generate response');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex items-center bg-white rounded-lg shadow-lg max-w-2xl w-full border border-gray-300">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your task here..."
          className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={`bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors duration-300 flex items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="animate-spin mr-2">⌛</span>
          ) : (
            <Sparkles className="w-5 h-5 mr-2" />
          )}
          <span>{isLoading ? 'Generating...' : 'Generate'}</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
