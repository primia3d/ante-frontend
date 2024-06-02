import React from 'react';

import { Button } from '@/components/Button';
import { Textarea } from '@/components/Textarea';

type AddContainerFormProps = {
  containerName: string;
  setContainerName: React.Dispatch<React.SetStateAction<string>>;
  onAddContainer: () => void;
  setIsAddContainerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddContainerForm({
  containerName,
  onAddContainer,
  setContainerName,
  setIsAddContainerOpen,
}: AddContainerFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddContainer();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full min-w-72 max-w-72 flex-col items-start gap-y-2 rounded-xl bg-gray-200 p-2"
    >
      <Textarea
        placeholder="Enter container title..."
        name="containername"
        value={containerName}
        onChange={(e) => setContainerName(e.target.value)}
        className="flex w-full  resize-none items-center rounded-lg bg-custom-50 px-2 text-sm text-custom-400"
        autoFocus
      />
      <div className="flex w-full items-center gap-2">
        <Button type="submit" variant="primary" className="w-full p-2">
          Add Container
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setIsAddContainerOpen(false);
            setContainerName('');
          }}
          className="w-full p-2"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
