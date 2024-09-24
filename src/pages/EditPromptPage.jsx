import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getPromptById, updatePrompt, archivePrompt, deletePrompt } from '../utils/indexedDB';
import { compareTexts } from '../utils/diffUtils';
import { toast } from 'sonner';
import { ArrowLeft, Archive, Trash2 } from 'lucide-react';
import PromptVersionControl from '../components/PromptVersionControl';
import DiffIndicator from '../components/DiffIndicator';
import DiffModal from '../components/DiffModal';

const EditPromptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState('');
  const [versions, setVersions] = useState([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [isDiffModalOpen, setIsDiffModalOpen] = useState(false);
  const [currentDiffs, setCurrentDiffs] = useState([]);

  const { data: promptData, isLoading, error } = useQuery({
    queryKey: ['prompt', id],
    queryFn: () => getPromptById(parseInt(id)),
  });

  useEffect(() => {
    if (promptData) {
      setTitle(promptData.title);
      setPrompt(promptData.prompt);
      setTags(promptData.tags.join(', '));
      setVersions(promptData.versions || [promptData.prompt]);
      setCurrentVersionIndex(promptData.versions ? promptData.versions.length - 1 : 0);
    }
  }, [promptData]);

  const updatePromptMutation = useMutation({
    mutationFn: updatePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries(['prompts']);
      queryClient.invalidateQueries(['prompt', id]);
      toast.success('Prompt updated successfully!');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error updating prompt:', error);
      toast.error('Failed to update prompt. Please try again.');
    },
  });

  const archivePromptMutation = useMutation({
    mutationFn: archivePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries(['prompts']);
      toast.success('Prompt archived successfully!');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error archiving prompt:', error);
      toast.error('Failed to archive prompt. Please try again.');
    },
  });

  const deletePromptMutation = useMutation({
    mutationFn: deletePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries(['prompts']);
      toast.success('Prompt deleted successfully!');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error deleting prompt:', error);
      toast.error('Failed to delete prompt. Please try again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVersions = [...versions, prompt];
    updatePromptMutation.mutate({
      id: parseInt(id),
      title,
      prompt,
      tags: tags.split(',').map(tag => tag.trim()),
      versions: newVersions,
    });
  };

  const handleArchive = () => {
    if (window.confirm('Are you sure you want to archive this prompt?')) {
      archivePromptMutation.mutate(parseInt(id));
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this prompt? This action cannot be undone.')) {
      deletePromptMutation.mutate(parseInt(id));
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleVersionChange = (newIndex) => {
    setCurrentVersionIndex(newIndex);
    setPrompt(versions[newIndex]);
  };

  const handleViewChanges = (e) => {
    e.preventDefault();
    const diffs = compareTexts(versions[currentVersionIndex - 1], versions[currentVersionIndex]);
    setCurrentDiffs(diffs);
    setIsDiffModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading prompt: {error.message}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100"
            onClick={handleArchive}
          >
            <Archive className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-100"
            onClick={handleDelete}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6">Edit Prompt Template</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter prompt template title"
            required
          />
        </div>
        <div>
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here"
            rows={6}
            required
          />
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <PromptVersionControl
            currentVersion={currentVersionIndex + 1}
            totalVersions={versions.length}
            onPrevious={() => handleVersionChange(Math.max(0, currentVersionIndex - 1))}
            onNext={() => handleVersionChange(Math.min(versions.length - 1, currentVersionIndex + 1))}
          />
          {currentVersionIndex > 0 && (
            <DiffIndicator
              oldText={versions[currentVersionIndex - 1]}
              newText={versions[currentVersionIndex]}
              onViewChanges={handleViewChanges}
            />
          )}
        </div>
        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>
        <Button type="submit">Update Prompt Template</Button>
      </form>
      <DiffModal
        isOpen={isDiffModalOpen}
        onClose={() => setIsDiffModalOpen(false)}
        diffs={currentDiffs}
      />
    </div>
  );
};

export default EditPromptPage;
