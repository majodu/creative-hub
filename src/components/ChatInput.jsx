import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement sending message to chatbot
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 flex items-center bg-white rounded-lg shadow-lg">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none"
      />
      <button
        onClick={handleSendMessage}
        className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
      >
        <Send className="w-5 h-5 mr-2" />
        <span>Send</span>
      </button>
    </div>
  );
};

export default ChatInput;