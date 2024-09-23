import React from 'react';
import { ThumbsUp, Bookmark } from 'lucide-react';

const PromptCard = ({ title, description, likes, tags }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm max-w-sm">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <Bookmark className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
          <ThumbsUp className="h-4 w-4" />
          <span>{likes}</span>
        </button>
        <div className="flex space-x-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="px-2 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
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