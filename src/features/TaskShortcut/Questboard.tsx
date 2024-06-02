import { useQuery } from '@tanstack/react-query';
import { TabsContent } from '@radix-ui/react-tabs';

import { QuestBoardItem } from '../Dashboard/Widgets/QuestBoard/QuestBoardItem';

import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';
import { getQuests } from '@/api/task';

export function Questboard() {
  const { data } = useQuery({
    queryKey: ['getQuests'],
    queryFn: () => getQuests(),
  });

  const quests = data || [];

  return (
    <Tabs defaultValue="all">
      <TabsList className="h-auto w-full justify-evenly bg-background">
        <TabsTrigger
          value="all"
          className="h-9 rounded-full px-4 text-custom-300 data-[state=active]:bg-custom-100 data-[state-active]:font-bold data-[state=active]:shadow-none"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="h-9 rounded-full px-4 text-custom-300 data-[state=active]:bg-custom-100 data-[state-active]:font-bold data-[state=active]:shadow-none"
        >
          Completed
        </TabsTrigger>
        <TabsTrigger
          value="pastDue"
          className="h-9 rounded-full px-4 text-custom-300 data-[state=active]:bg-custom-100 data-[state-active]:font-bold data-[state=active]:shadow-none"
        >
          Past Due
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="p-6">
        <ul className="space-y-2.5">
          {quests.map(({ id, title }) => (
            <QuestBoardItem key={id} questTitle={title} tag='"sample tag"' />
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="completed" className="p-6">
        <ul className="space-y-2.5">
          {quests.map(({ id, title }) => (
            <QuestBoardItem key={id} questTitle={title} tag='"sample tag"' />
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="pastDue" className="p-6">
        <ul className="space-y-2.5">
          {quests.map(({ id, title }) => (
            <QuestBoardItem key={id} questTitle={title} tag='"sample tag"' />
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
