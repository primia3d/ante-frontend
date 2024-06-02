import { Trash2, X } from 'lucide-react';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/Dialog';
import { CustomIcon } from '@/features/CustomIcon';
import { useBoolean } from '@/hooks/useBoolean';
import { cn } from '@/utils/cn';

type SignatureCardProps = {
  name: string;
  time: string;
  type: 'approve' | 'submit';
};

function SignatureCard({ name, time, type }: SignatureCardProps) {
  return (
    <div className={cn('w-full rounded-lg px-5 py-3', type === 'approve' && 'bg-custom-100')}>
      <h4 className="font-semibold capitalize text-custom-300">
        {type === 'approve' ? 'Approved by:' : 'Submitted by:'}
      </h4>
      <div className="flex items-center gap-4 py-2">
        <div className="h-9 w-9 overflow-hidden rounded-full">
          <img
            src={type === 'approve' ? '/images/person02.webp' : '/images/person01.webp'}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-custom-300">{time}</p>
        </div>
      </div>
    </div>
  );
}

type NotificationItemProps = {
  isRead: boolean;
  image: string;
  approver: string;
  task: string;
  formattedTime: string;
  variant: 'notification' | 'update';
};

export function NotificationItem({ approver, formattedTime, image, isRead, task, variant }: NotificationItemProps) {
  const { value: isNotificationItemOpen, set: setIsNotificationItemOpen } = useBoolean(false);

  return (
    <Dialog open={isNotificationItemOpen} onOpenChange={setIsNotificationItemOpen}>
      <DialogTrigger asChild>
        {variant === 'notification' ? (
          <li
            className={cn(
              'relative flex cursor-pointer items-start gap-5 bg-background px-10 py-4 hover:bg-gray-100',
              !isRead && 'bg-custom-100',
            )}
          >
            {!isRead && <span className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-error-300 " />}
            <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full">
              <img src={image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex w-full flex-col text-custom-300">
              <p>
                <span className="font-bold text-black">{approver}</span> approved your request
              </p>
              <p className="font-bold text-black">{task}</p>
              <p className="text-xs">{formattedTime}</p>
            </div>
          </li>
        ) : (
          <li
            className={cn(
              'relative w-full cursor-pointer rounded-xl px-12 py-5 transition-all duration-150 hover:w-[99%] hover:shadow',
              !isRead && 'bg-custom-100',
            )}
          >
            <CustomIcon
              variant="circle"
              className={cn('absolute left-4 top-4 h-2.5 w-2.5', !isRead ? 'text-error-300' : 'text-custom-200')}
            />

            <h3 className="font-bold">{task}</h3>
            <span className="text-custom-300">{formattedTime}</span>
          </li>
        )}
      </DialogTrigger>
      <DialogContent variant="top" className="p-5 text-sm sm:p-8">
        <DialogClose asChild>
          <Button
            type="button"
            variant="secondary"
            className="absolute right-5 top-5 h-6 w-6 rounded-none bg-background p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>
        <div>
          <h3 className="mb-5 flex items-center gap-2 text-[15px] font-bold">
            <CustomIcon variant="check" className="text-success-300" />
            Task Approved
          </h3>
          <section>
            <h1 className="text-lg font-bold">{task}</h1>
            <p className="text-custom-300">Costing/ Bill of Quantity</p>
            <div className="my-4 flex items-center gap-2">
              <Badge variant="primary">Urgent</Badge>
            </div>
          </section>
          <p className="mb-8 text-pretty text-custom-300">
            Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus
            delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an.
          </p>

          <ul className="space-y-1">
            <li className="flex items-start gap-2 break-words py-1 text-custom-300">
              <span className="inline-block w-1/5 shrink-0 text-custom-200">Start Date:</span>
              Feb 10, 2023
            </li>
            <li className="flex items-start gap-2 break-words py-1 text-custom-300">
              <span className="inline-block w-1/5 shrink-0 text-custom-200">End Date:</span>
              Feb 13, 2023
            </li>
            <li className="flex items-start gap-2 break-words py-1 font-bold text-custom-400">
              <span className="inline-block w-1/5 shrink-0 font-normal text-custom-200">Tagged Item:</span>
              BOQ Worksheet - Project 5 BOQ Worksheet - Project 5 BOQ Worksheet - Project 5
            </li>
          </ul>

          <section className="flex flex-col items-center gap-2 py-8 sm:flex-row">
            <SignatureCard type="approve" name={approver} time={formattedTime} />
            <SignatureCard type="submit" name="Juan Dela Cruz" time="3 days ago" />
          </section>
        </div>
        <DialogFooter className="flex-row gap-2 sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-36"
            onClick={() => setIsNotificationItemOpen(false)}
          >
            Close
          </Button>
          <Button type="button" variant="primary" className="w-full sm:w-36">
            <Trash2 className="h-5 w-5" />
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
