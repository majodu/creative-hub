import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Undo2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unarchivePrompt } from '../utils/indexedDB';
import { toast } from 'sonner';

const ArchiveCard = ({ prompt }) => {
  const queryClient = useQueryClient();

  const unarchiveMutation = useMutation({
    mutationFn: unarchivePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries(['archivedPrompts']);
      queryClient.invalidateQueries(['prompts']);
      toast.success('Prompt unarchived successfully');
    },
    onError: (error) => {
      toast.error(`Failed to unarchive prompt: ${error.message}`);
    },
  });

  const handleUnarchive = () => {
    unarchiveMutation.mutate(prompt.id);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{prompt.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4">{prompt.prompt.substring(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400">
            Archived: {new Date(prompt.archivedAt).toLocaleDateString()}
          </div>
          <Button variant="outline" size="sm" onClick={handleUnarchive} disabled={unarchiveMutation.isLoading}>
            <Undo2 className="mr-2 h-4 w-4" />
            Unarchive
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArchiveCard;