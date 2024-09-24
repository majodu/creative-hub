import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import PromptFormPage from "./pages/PromptFormPage";
import EditPromptPage from "./pages/EditPromptPage";
import UsePromptPage from "./pages/UsePromptPage";
import Settings from "./pages/Settings";
import Archive from "./pages/Archive";
import ChatPage from "./pages/ChatPage";
import Activity from "./pages/Activity";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <div className="flex">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/new-prompt" element={<PromptFormPage />} />
                <Route path="/edit-prompt/:id" element={<EditPromptPage />} />
                <Route path="/use-prompt/:id" element={<UsePromptPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/activity" element={<Activity />} />
              </Routes>
            </main>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
