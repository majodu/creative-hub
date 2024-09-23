import React from 'react';
import { Share, Bookmark, BookmarkCheck } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePrompt } from '../utils/indexedDB';
import { toast } from 'sonner';
import { truncateText } from '../utils/textUtils';
import { useNavigate } from 'react-router-dom';

const PromptCard = ({ id, title, prompt, likes, tags, bookmarked }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const bookmarkMutation = useMutation({
    mutationFn: (newBookmarkStatus) => updatePrompt({ id, bookmarked: newBookmarkStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries(['prompts']);
      toast.success(bookmarked ? 'Prompt unbookmarked' : 'Prompt bookmarked');
    },
    onError: () => {
      toast.error('Failed to update bookmark status');
    },
  });

  const handleBookmark = (e) => {
    e.stopPropagation();
    bookmarkMutation.mutate(!bookmarked);
  };

  const handleCardClick = () => {
    navigate(`/edit-prompt/${id}`);
  };

  const shouldShowTags = tags.length > 1 || (tags.length === 1 && tags[0] !== '');

  return (
    <div 
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button 
          className={`text-gray-400 hover:text-gray-600 ${bookmarked ? 'text-blue-500' : ''}`}
          onClick={handleBookmark}
          disabled={bookmarkMutation.isLoading}
        >
          {bookmarked ? (
            <BookmarkCheck className="h-4 w-4" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      </div>
      <p className="mt-1 text-xs text-gray-600">{truncateText(prompt, 100)}</p>
      <div className="mt-3 flex items-center justify-between">
        <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-800">
          <Share className="h-3 w-3" />
          <span>{likes}</span>
        </button>
        {shouldShowTags && (
          <div className="flex space-x-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 text-[10px] font-medium text-gray-600 bg-white border border-gray-300 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
