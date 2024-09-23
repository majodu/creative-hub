import React from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import TabNavigation from '../components/TabNavigation';
import PromptGrid from '../components/PromptGrid';
import GeneratePromptButton from '../components/GeneratePromptButton';

const Index = () => {
  const samplePrompts = [
    {
      title: "Blog Intro",
      description: "Let's start with a compelling intro that hooks your readers from the get-go and kick your blog up a notch!",
      likes: 34,
      tags: ["Branding", "Marketing"]
    },
    {
      title: "Product Description",
      description: "Create an engaging product description that highlights key features and benefits.",
      likes: 28,
      tags: ["E-commerce", "Copywriting"]
    },
    {
      title: "Social Media Post",
      description: "Craft a catchy social media post that drives engagement and increases followers.",
      likes: 42,
      tags: ["Social Media", "Marketing"]
    },
    {
      title: "Email Subject Line",
      description: "Generate attention-grabbing email subject lines to improve open rates.",
      likes: 19,
      tags: ["Email Marketing", "Copywriting"]
    },
    {
      title: "SEO Meta Description",
      description: "Write an optimized meta description to improve click-through rates from search results.",
      likes: 31,
      tags: ["SEO", "Web Content"]
    },
    {
      title: "Video Script Outline",
      description: "Create a structured outline for an informative and engaging video script.",
      likes: 23,
      tags: ["Video Content", "Scriptwriting"]
    }
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 relative">
        <div className="mb-2 w-full">
          <SearchBar />
        </div>
        <div className="mb-2">
          <TabNavigation />
        </div>
        <PromptGrid prompts={samplePrompts} />
        <GeneratePromptButton />
      </main>
    </div>
  );
};

export default Index;
