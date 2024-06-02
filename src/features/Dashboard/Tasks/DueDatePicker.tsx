import { format } from 'date-fns';
import { forwardRef } from 'react';

import { Button } from '@/components/Button';
import { Calendar } from '@/components/Calendar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/Dialog';
import { CustomIcon } from '@/features/CustomIcon';
import { useBoolean } from '@/hooks/useBoolean';
import { cn } from '@/utils/cn';

type DueDatePickerProps = {
  className: string;
  value?: Date;
  onChange?: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export const DueDatePicker = forwardRef<unknown, DueDatePickerProps>(function DueDatePicker(
  { className, value: date, onChange: setDate },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ref,
) {
  const { value: isOpen, set: setIsOpen } = useBoolean(false);
  // const [date, setDate] = useState<Date>();

  // useEffect(() => {
  //   if (date) onChange?.(date);
  // }, [date, onChange]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'h-11 w-full justify-start rounded-lg border-2 border-custom-100 bg-custom-50 px-3',
            !date && 'text-muted-foreground',
            className,
          )}
        >
          <CustomIcon variant="calendar" className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          {date ? format(date, 'LL/dd/yyyy') : <span className="text-custom-200">mm/dd/yyyy</span>}
        </Button>
      </DialogTrigger>
      <DialogContent variant="normal" className="w-auto rounded-2xl">
        <Calendar
          mode="single"
          formatters={{
            formatWeekdayName: (day) => day?.toLocaleDateString('en-US', { weekday: 'short' }),
          }}
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="flex items-center justify-between px-6 pb-6">
          <Button className="text-primary-100 hover:underline" onClick={() => setDate?.(undefined)}>
            Clear
          </Button>
          <Button className="text-primary-100 hover:underline" onClick={() => setDate?.(new Date())}>
            Today
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});
