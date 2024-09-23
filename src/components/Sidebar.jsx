import React from 'react';
import { Home, FolderTree, Activity, Settings, Archive, Plus, Chrome, Globe, Code } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#f9f9f9] p-4 flex flex-col text-sm">
      {/* Brand Section */}
      <div className="mb-4">
        <div className="flex items-center mb-1">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-lg font-bold">gwift</span>
        </div>
        <span className="text-xs text-gray-500">ver 12.03.1</span>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-lg p-3 mb-4 flex items-center">
        <img src="/placeholder.svg" alt="Erin George" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h3 className="text-base font-medium">Erin George</h3>
          <p className="text-xs text-gray-500">Main user</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mb-4">
        <h4 className="text-xs font-semibold text-gray-500 mb-2">Main</h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Home className="w-4 h-4 mr-3" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <FolderTree className="w-4 h-4 mr-3" />
              <span>Categories</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Activity className="w-4 h-4 mr-3" />
              <span>Activity</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Settings className="w-4 h-4 mr-3" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Archive className="w-4 h-4 mr-3" />
              <span>Archive</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Integrations Section */}
      <div className="mt-4">
        <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center">
          Integrations
          <Plus className="w-3 h-3 ml-1" />
        </h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Chrome className="w-4 h-4 mr-3" />
              <span>Chrome plugin</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Globe className="w-4 h-4 mr-3" />
              <span>Web plugin</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Code className="w-4 h-4 mr-3" />
              <span>Source code</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
