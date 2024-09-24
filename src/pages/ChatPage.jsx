import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateOpenAIResponseForChatPage } from '../utils/openai';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
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
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with AI</h1>
      <ScrollArea className="flex-grow mb-4 p-4 border rounded-lg bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white border border-gray-300'
              }`}>
                <ReactMarkdown 
                  className="prose prose-sm max-w-none"
                  components={{
                    p: ({node, ...props}) => <p className="mb-2" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    code: ({node, inline, ...props}) => 
                      inline 
                        ? <code className="bg-gray-100 rounded px-1 py-0.5" {...props} />
                        : <code className="block bg-gray-100 rounded p-2 my-2 whitespace-pre-wrap" {...props} />,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {chatMutation.isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-300 p-3 rounded-lg">
                <div className="animate-pulse flex space-x-2">
                  <div className="rounded-full bg-gray-300 h-2 w-2"></div>
                  <div className="rounded-full bg-gray-300 h-2 w-2"></div>
                  <div className="rounded-full bg-gray-300 h-2 w-2"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow"
        />
        <Button type="submit" disabled={chatMutation.isLoading}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatPage;
