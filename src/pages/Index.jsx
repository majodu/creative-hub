import React from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import TabNavigation from '../components/TabNavigation';

const Index = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <div className="mb-8">
          <SearchBar />
        </div>
        <div className="px-8">
          <TabNavigation />
          {/* Add more content here */}
        </div>
      </main>
    </div>
  );
};

export default Index;
