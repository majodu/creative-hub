import React from 'react';
import { Command } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="flex items-center justify-between w-full bg-[#f5f5f5] rounded-lg h-8 px-1">
      <div className="flex items-center flex-1">
        <div className="flex items-center mr-1">
          <div className="bg-gray-200 rounded-full p-0.5 mr-0.5">
            <Command className="h-2 w-2 text-gray-400" />
          </div>
          <div className="bg-gray-200 rounded-full p-0.5">
            <span className="text-[10px] text-gray-400">K</span>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search for template"
          className="bg-transparent w-full text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
        />
      </div>
      <button className="bg-black text-white px-2 py-0.5 rounded text-xs font-bold hover:bg-gray-800 transition-colors">
        Add template
      </button>
    </div>
  );
};

export default SearchBar;
