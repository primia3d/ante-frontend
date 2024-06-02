import { X } from 'lucide-react';

import { CustomIcon } from '../CustomIcon';

import { MyTasks } from './MyTasks';
import { Updates } from './Updates';
import { Questboard } from './Questboard';

import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/Dialog';
import { useBoolean } from '@/hooks/useBoolean';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

export function TaskShortcut() {
  const { value: isOpen, set: setIsOpen } = useBoolean();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-secondary-200 text-white shadow hover:bg-secondary-200/90 sm:bottom-14 sm:right-14"
          title="Create/Assign Task"
        >
          <CustomIcon variant="tasks" />
        </Button>
      </DialogTrigger>

      <DialogContent
        variant="side"
        className="fixed bottom-0 right-0 top-0 z-[60] h-dvh w-full max-w-md overflow-y-auto rounded-l-xl bg-white text-[13px] transition !duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full"
      >
        <DialogHeader className="flex flex-row items-center justify-between px-10 pb-4 pt-14">
          <DialogClose asChild>
            <Button
              type="button"
              className="absolute left-5 top-5 h-8 w-8 -translate-y-0.5 rounded-full bg-custom-100 p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-custom-50 hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <Tabs defaultValue="tasks">
          <TabsList className="h-auto w-full justify-evenly bg-background p-4">
            <TabsTrigger
              value="tasks"
              className="text-base text-custom-300 data-[state=active]:font-bold data-[state=active]:shadow-none"
            >
              <span className="sr-only">My Tasks</span>
              My Tasks
            </TabsTrigger>
            <TabsTrigger
              value="updates"
              className="text-base text-custom-300 data-[state=active]:font-bold data-[state=active]:shadow-none"
            >
              <span className="sr-only">Updates</span>
              Updates
            </TabsTrigger>
            <TabsTrigger
              value="questboard"
              className="text-base text-custom-300 data-[state=active]:font-bold data-[state=active]:shadow-none"
            >
              <span className="sr-only">Questboard</span>
              Questboard
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
            <MyTasks />
          </TabsContent>
          <TabsContent value="updates">
            <Updates />
          </TabsContent>
          <TabsContent value="questboard">
            <Questboard />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
