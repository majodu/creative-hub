import React, { useState } from 'react';
import { Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleAddTemplate = () => {
    navigate('/new-prompt', { state: { initialPrompt: '' } });
  };

  return (
    <div className="flex items-center justify-between w-full bg-[#f5f5f5] rounded-lg h-10 px-2">
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
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for template"
          className="bg-transparent w-full text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
        />
      </div>
      <button 
        onClick={handleAddTemplate}
        className="bg-black text-white px-4 py-1 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
      >
        Add template
      </button>
    </div>
  );
};

export default SearchBar;
