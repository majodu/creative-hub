import { HomeIcon, PlusCircleIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import PromptFormPage from "./pages/PromptFormPage.jsx";

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
];
