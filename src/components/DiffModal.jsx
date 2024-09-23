import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const DiffModal = ({ isOpen, onClose, diffs }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Changes</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <pre className="text-sm">
            {diffs.map((part, index) => (
              <span
                key={index}
                className={
                  part.added
                    ? "bg-green-100 text-green-800"
                    : part.removed
                    ? "bg-red-100 text-red-800"
                    : ""
                }
              >
                {part.value}
              </span>
            ))}
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DiffModal;