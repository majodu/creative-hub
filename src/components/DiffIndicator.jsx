import React from 'react';
import { compareTexts } from '../utils/diffUtils';
import { Button } from "@/components/ui/button";

const DiffIndicator = ({ oldText, newText, onViewChanges }) => {
  let differences = [];
  try {
    differences = compareTexts(oldText, newText);
  } catch (error) {
    console.error('Error comparing texts:', error);
    // Handle the error gracefully, maybe set a state to show an error message
  }

  const addedLines = differences.filter(d => d.added).length;
  const removedLines = differences.filter(d => d.removed).length;

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex items-center text-xs space-x-1">
        <span className="text-green-500">+{addedLines}</span>
        <span className="text-red-500">-{removedLines}</span>
        <div className="flex space-x-0.5">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 ${
                index < addedLines
                  ? 'bg-green-500'
                  : index < addedLines + removedLines
                  ? 'bg-red-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onViewChanges}>
        View Changes
      </Button>
    </div>
  );
};

export default DiffIndicator;
