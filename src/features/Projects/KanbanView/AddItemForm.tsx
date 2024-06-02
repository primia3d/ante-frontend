import { Button } from '@/components/Button';
import { Textarea } from '@/components/Textarea';

type AddItemFormProps = {
  itemName: string;
  setItemName: React.Dispatch<React.SetStateAction<string>>;
  onAddItem: () => void;
  setIsAddItemOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddItemForm({ itemName, onAddItem, setIsAddItemOpen, setItemName }: AddItemFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddItem();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <Textarea
        placeholder="Enter a title for this card..."
        name="itemname"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="flex w-full resize-none items-center rounded-lg bg-custom-50 px-2 text-sm text-custom-400"
        autoFocus
      />
      <div className="flex w-full items-center gap-2">
        <Button type="submit" variant="primary" className="w-full p-2">
          Add Card
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setIsAddItemOpen(false);
            setItemName('');
          }}
          className="w-full p-2"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
