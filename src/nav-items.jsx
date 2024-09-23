import { HomeIcon, PlusCircleIcon, Settings } from "lucide-react";
import Index from "./pages/Index.jsx";
import PromptFormPage from "./pages/PromptFormPage.jsx";
import SettingsPage from "./pages/Settings.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "New Prompt",
    to: "/new-prompt",
    icon: <PlusCircleIcon className="h-4 w-4" />,
    page: <PromptFormPage />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <Settings className="h-4 w-4" />,
    page: <SettingsPage />,
  },
];
