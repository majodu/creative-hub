import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromptVersionControl = ({ currentVersion, totalVersions, onPrevious, onNext }) => {
  return (
    <div className="flex items-center justify-center space-x-2 bg-gray-100 rounded-md p-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        disabled={currentVersion === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">
        {currentVersion}/{totalVersions}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={currentVersion === totalVersions}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PromptVersionControl;