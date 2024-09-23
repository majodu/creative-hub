import React from 'react';
import { Home, FolderTree, Activity, Settings, Archive, Plus, Chrome, Safari, Code } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#f9f9f9] p-4 flex flex-col">
      {/* Brand Section */}
      <div className="mb-6">
        <div className="flex items-center mb-1">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-bold">gwift</span>
        </div>
        <span className="text-sm text-gray-500">ver 12.03.1</span>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-lg p-4 mb-6 flex items-center">
        <img src="/placeholder.svg" alt="Erin George" className="w-12 h-12 rounded-full mr-3" />
        <div>
          <h3 className="text-lg font-medium">Erin George</h3>
          <p className="text-sm text-gray-500">Main user</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mb-6">
        <h4 className="text-sm font-semibold text-gray-500 mb-2">Main</h4>
        <ul className="space-y-3">
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Home className="w-5 h-5 mr-3" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <FolderTree className="w-5 h-5 mr-3" />
              <span>Categories</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Activity className="w-5 h-5 mr-3" />
              <span>Activity</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Archive className="w-5 h-5 mr-3" />
              <span>Archive</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Integrations Section */}
      <div className="mt-auto">
        <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
          Integrations
          <Plus className="w-4 h-4 ml-1" />
        </h4>
        <ul className="space-y-3">
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Chrome className="w-5 h-5 mr-3" />
              <span>Chrome plugin</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Safari className="w-5 h-5 mr-3" />
              <span>Safari plugin</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-black">
              <Code className="w-5 h-5 mr-3" />
              <span>Source code</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;