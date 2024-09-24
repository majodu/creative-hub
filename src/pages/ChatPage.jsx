import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateOpenAIResponseForChatPage } from '../utils/openai';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { Copy } from 'lucide-react';
import { incrementChatMessagesSent } from '../utils/statistics';

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
  }, []);

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

    await incrementChatMessagesSent();
    chatMutation.mutate(input);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Text copied to clipboard');
    }, (err) => {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy text');
    });
  };

  return (
    <div className="flex flex-col h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Chat with AI</h1>
      <ScrollArea className="flex-grow mb-4 p-4 border rounded-lg">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'} max-w-[80%]`}>
              {message.role === 'user' ? (
                <p>{message.content}</p>
              ) : (
                <ReactMarkdown className="prose prose-sm dark:prose-invert">
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
            {message.role === 'assistant' && (
              <div className="mt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopyText(message.content)}
                  className="p-1 h-6 w-6"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
        {chatMutation.isLoading && (
          <div className="text-center text-gray-500">AI is thinking...</div>
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
