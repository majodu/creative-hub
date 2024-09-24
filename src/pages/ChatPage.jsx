import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateOpenAIResponseForChatPage } from '../utils/openai';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

const ChatPage = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (location.state && location.state.initialMessage) {
      setMessages([{ role: 'user', content: location.state.initialMessage }]);
      chatMutation.mutate(location.state.initialMessage);
    }
  }, [location.state]);

  const chatMutation = useMutation({
    mutationFn: generateOpenAIResponseForChatPage,
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: 'assistant', content: data }]);
      queryClient.invalidateQueries(['chatPageHistory']);
    },
    onError: (error) => {
      toast.error('Failed to get response from AI. Please try again.');
      console.error('Error in chat mutation:', error);
    }
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    chatMutation.mutate(input);
  };

  return (
    <div className="flex flex-col h-screen p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Chat with AI</h1>
      <ScrollArea className="flex-grow mb-4 p-4 border rounded-lg">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] md:max-w-[70%] p-3 rounded-lg ${
                message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                <ReactMarkdown 
                  className="prose max-w-none dark:prose-invert"
                  components={{
                    p: ({node, ...props}) => <p className="mb-2" {...props} />,
                    pre: ({node, ...props}) => <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto" {...props} />,
                    code: ({node, inline, ...props}) => 
                      inline 
                        ? <code className="bg-gray-200 text-red-500 px-1 rounded" {...props} />
                        : <code className="block bg-gray-800 text-white p-2 rounded overflow-x-auto" {...props} />,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        {chatMutation.isLoading && (
          <div className="text-center text-gray-500 mt-4">AI is thinking...</div>
        )}
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow"
        />
        <Button type="submit" disabled={chatMutation.isLoading}>Send</Button>
      </form>
    </div>
  );
};

export default ChatPage;
