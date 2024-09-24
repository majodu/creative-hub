import { diffChars } from 'diff';

export const compareTexts = (oldText, newText) => {
  // Check if either oldText or newText is undefined or null
  if (oldText == null || newText == null) {
    return []; // Return an empty array if either text is undefined or null
  }

  // Convert to string in case the inputs are not strings
  const oldString = String(oldText);
  const newString = String(newText);

  const differences = diffChars(oldString, newString);
  
  return differences.map((part, index) => ({
    id: index,
    value: part.value,
    added: part.added,
    removed: part.removed
  }));
};
