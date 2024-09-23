import React from 'react';
import { Command } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto bg-[#f5f5f5] rounded-lg h-10 px-2">
      <div className="flex items-center flex-1">
        <div className="flex items-center mr-2">
          <div className="bg-gray-200 rounded-full p-1 mr-1">
            <Command className="h-3 w-3 text-gray-400" />
          </div>
          <div className="bg-gray-200 rounded-full p-1">
            <span className="text-xs text-gray-400">K</span>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search for template"
          className="bg-transparent w-full text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
        />
      </div>
      <button className="bg-black text-white px-4 py-1 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
        Add template
      </button>
    </div>
  );
};

export default SearchBar;
