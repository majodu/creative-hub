import { diffChars } from 'diff';

export const compareTexts = (oldText, newText) => {
  const differences = diffChars(oldText, newText);
  
  return differences.map((part, index) => ({
    id: index,
    value: part.value,
    added: part.added,
    removed: part.removed
  }));
};