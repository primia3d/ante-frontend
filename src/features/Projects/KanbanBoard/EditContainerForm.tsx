import { UniqueIdentifier } from '@dnd-kit/core';
import React, { useState } from 'react';

import { Button } from '@/components/Button';
import { Textarea } from '@/components/Textarea';

type EditContainerFormProps = {
  title: string;
  containerId: UniqueIdentifier;
  onEditContainer: (containerId: UniqueIdentifier, newTitle: string) => void;
  setIsEditContainerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditContainerForm({
  title,
  containerId,
  onEditContainer,
  setIsEditContainerOpen,
}: EditContainerFormProps) {
  const [updatedTitle, setUpdatedTitle] = useState(title);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEditContainer(containerId, updatedTitle);
    setIsEditContainerOpen(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 px-2">
      <Textarea
        placeholder="Enter a title for this container..."
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        className="h-auto resize-none rounded-xl bg-custom-50 p-2"
        autoFocus
      />
      <div className="flex w-full items-center gap-2">
        <Button type="submit" variant="primary" className="w-full p-2">
          Save
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setIsEditContainerOpen(false);
            setUpdatedTitle(title);
          }}
          className="w-full p-2"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
