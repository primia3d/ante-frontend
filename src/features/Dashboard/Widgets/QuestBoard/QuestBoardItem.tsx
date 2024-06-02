import { EllipsisVertical } from 'lucide-react';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { CustomIcon } from '@/features/CustomIcon';

type QuestBoardItemProps = {
  questTitle: string;
  tag: string;
};

export function QuestBoardItem({ questTitle, tag }: QuestBoardItemProps) {
  return (
    <li className="flex items-center gap-6 rounded-lg border-2 bg-custom-100 p-6">
      <div className="">
        <CustomIcon variant="file-plus" className="h-6 w-6" />
      </div>

      <div className="flex w-full flex-col gap-1">
        <p className="font-semibold">{questTitle}</p>
        <div className="flex items-center gap-2">
          <Badge variant="primary">{tag}</Badge>
        </div>
      </div>
      <Button className="ml-auto">
        <EllipsisVertical />
      </Button>
    </li>
  );
}
