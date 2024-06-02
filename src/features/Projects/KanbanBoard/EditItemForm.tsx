import { UniqueIdentifier } from '@dnd-kit/core';
import React, { useState } from 'react';

import { Button } from '@/components/Button';
import { Textarea } from '@/components/Textarea';

type EditItemFormProps = {
  title: string;
  containerId: UniqueIdentifier;
  itemId: UniqueIdentifier;
  setIsEditItemOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEditItem: (containerId: UniqueIdentifier, itemId: UniqueIdentifier, newTitle: string) => void;
};

export function EditItemForm({ title, setIsEditItemOpen, onEditItem, containerId, itemId }: EditItemFormProps) {
  const [updatedTitle, setUpdatedTitle] = useState(title);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEditItem(containerId, itemId, updatedTitle);
    setIsEditItemOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <Textarea
        placeholder="Enter a title for this card..."
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
            setIsEditItemOpen(false);
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
