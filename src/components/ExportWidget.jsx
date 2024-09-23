import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { exportPromptsAsJson } from '../utils/exportUtils';

const ExportWidget = ({ selectedPrompts, prompts }) => {
  const handleExport = () => {
    const selectedPromptData = prompts.filter(prompt => selectedPrompts.includes(prompt.id));
    exportPromptsAsJson(selectedPromptData);
  };

  return (
    <Button
      onClick={handleExport}
      disabled={selectedPrompts.length === 0}
      className="flex items-center space-x-2"
    >
      <Download className="h-4 w-4" />
      <span>Export Selected ({selectedPrompts.length})</span>
    </Button>
  );
};

export default ExportWidget;