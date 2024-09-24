import React from 'react';
import { Home, FolderTree, Activity, Settings, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#f9f9f9] p-4 flex flex-col text-sm">
      {/* Brand Section */}
      <div className="mb-4">
        <div className="flex items-center mb-1">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-lg font-bold">Prompt keeper</span>
        </div>
        <span className="text-xs text-gray-500">ver 1.0.0</span>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-lg p-3 mb-4 flex items-center">
        <img src="/placeholder.svg" alt="John Doe" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h3 className="text-base font-medium">John Doe</h3>
          <p className="text-xs text-gray-500">Main user</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mb-4">
        <h4 className="text-xs font-semibold text-gray-500 mb-2">Main</h4>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center text-gray-700 hover:text-black">
              <Home className="w-4 h-4 mr-3" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/categories" className="flex items-center text-gray-700 hover:text-black">
              <FolderTree className="w-4 h-4 mr-3" />
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link to="/activity" className="flex items-center text-gray-700 hover:text-black">
              <Activity className="w-4 h-4 mr-3" />
              <span>Activity</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center text-gray-700 hover:text-black">
              <Settings className="w-4 h-4 mr-3" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/archive" className="flex items-center text-gray-700 hover:text-black">
              <Archive className="w-4 h-4 mr-3" />
              <span>Archive</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
