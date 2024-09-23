import React from 'react';
import { ThumbsUp, Bookmark, Star } from 'lucide-react';

const PromptCard = ({ title, prompt, likes, tags, isFavorited }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center space-x-2">
          {isFavorited && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
          <button className="text-gray-400 hover:text-gray-600">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-600">{prompt}</p>
      <div className="mt-3 flex items-center justify-between">
        <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-800">
          <ThumbsUp className="h-3 w-3" />
          <span>{likes}</span>
        </button>
        <div className="flex space-x-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="px-1.5 py-0.5 text-[10px] font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
