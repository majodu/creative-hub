import React, { useState } from 'react';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('promptTemplates');

  const tabs = [
    { id: 'promptTemplates', label: 'Prompt templates' },
    { id: 'topPrompts', label: 'Top Prompts' },
    { id: 'myPrompts', label: 'My prompts' },
  ];

  return (
    <div className="bg-[#F5F5F5] p-1 rounded-lg">
      <nav className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-[#333333] shadow-sm'
                : 'bg-[#EAEAEA] text-[#666666] hover:bg-[#D9D9D9]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;