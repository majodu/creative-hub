import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromptVersionControl = ({ currentVersion, totalVersions, onPrevious, onNext }) => {
  return (
    <div className="flex items-center space-x-1 text-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        disabled={currentVersion === 1}
        className="p-1 h-auto"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-xs font-medium">
        {currentVersion}/{totalVersions}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={currentVersion === totalVersions}
        className="p-1 h-auto"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PromptVersionControl;
