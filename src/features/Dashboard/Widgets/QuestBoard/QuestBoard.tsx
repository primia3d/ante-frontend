import { useQuery } from '@tanstack/react-query';

import { QuestBoardItem } from './QuestBoardItem';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { getQuests } from '@/api/task';

export function QuestBoard() {
  const { data } = useQuery({
    queryKey: ['getQuests'],
    queryFn: () => getQuests(),
  });

  const quests = data || [];

  return (
    <Card className="appear">
      <CardHeader className="px-6 py-8">
        <CardTitle className="whitespace-nowrap text-xl font-bold">
          Quest Board
          <span className="ml-2 font-normal tracking-widest text-custom-200">({quests.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="no-scrollbar max-h-[28rem] overflow-y-auto p-4">
        <ul className="space-y-4">
          {quests.map(({ id, title }) => (
            <QuestBoardItem key={id} questTitle={title} tag='"sample tag"' />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
