import { X } from 'lucide-react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import React, { useEffect } from 'react';

import { CustomIcon } from '../CustomIcon';

import { Button } from '@/components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog';
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { toast } from '@/components/Toaster';
import { cn } from '@/utils/cn';
import { TLayout } from '@/types/dashboard';

type WidgetLibraryProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  layout: TLayout;
  setLayout: React.Dispatch<React.SetStateAction<TLayout>>;
};

type DisplayAreaItemProps = {
  field: ControllerRenderProps<
    {
      type: TLayout;
    },
    'type'
  >;
  payload: TLayout;
  className?: string;
};

const WidgetFormSchema = z.object({
  type: z.enum(['display-a', 'display-b', 'display-c', 'display-d'], {
    required_error: 'You need to select a notification type.',
  }),
});

function DisplayAreaItem({ field, payload, className }: DisplayAreaItemProps) {
  return (
    <div className={cn('h-20 w-full rounded-xl', field.value === payload ? 'bg-white/10' : 'bg-gray-200', className)} />
  );
}

export function WidgetLibrary({ isOpen, setIsOpen, setLayout, layout }: WidgetLibraryProps) {
  const form = useForm<z.infer<typeof WidgetFormSchema>>({
    resolver: zodResolver(WidgetFormSchema),
    defaultValues: {
      type: 'display-a',
    },
  });

  function onSubmit(data: z.infer<typeof WidgetFormSchema>) {
    setLayout(data.type);
    setIsOpen(false);
    toast({
      description: 'Layout changes applied!',
      className: 'bg-green-700/80 text-white border border-green-500 rounded-none text-center',
      duration: 2000,
    });
  }

  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    form.reset({
      type: layout,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-9 w-9 shrink-0 rounded bg-primary-100 hover:bg-primary-100/90"
          onClick={(e) => e.stopPropagation()}
        >
          <CustomIcon variant="sliders" className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent
        variant="top"
        className="max-h-dvh origin-bottom space-y-8 overflow-y-auto rounded-2xl border-none bg-white p-8 text-[13px] sm:max-w-2xl"
      >
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-bold">Widget Library</DialogTitle>
          <DialogDescription>Choose how to display your widgets.</DialogDescription>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="absolute right-4 top-4 h-6 w-6 -translate-y-0.5 rounded-none bg-background p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <FormLabel
                            htmlFor="display-a"
                            className={cn(
                              'h-52 w-full cursor-pointer rounded-xl px-[30px] py-[18px]',
                              field.value === 'display-a' ? 'bg-primary-100' : 'bg-custom-100',
                            )}
                          >
                            <RadioGroupItem
                              id="display-a"
                              value="display-a"
                              className={cn(
                                'absolute left-3 top-3 h-[18px] w-[18px] border-none shadow-none',
                                field.value === 'display-a' && 'bg-green-500',
                              )}
                            />
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-2.5">
                                <DisplayAreaItem field={field} payload="display-a" />
                                <DisplayAreaItem field={field} payload="display-a" />
                              </div>
                              <DisplayAreaItem field={field} payload="display-a" />
                            </div>
                          </FormLabel>
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <FormLabel
                            htmlFor="display-b"
                            className={cn(
                              'h-52 w-full cursor-pointer rounded-xl px-[30px] py-[18px]',
                              field.value === 'display-b' ? 'bg-primary-100' : 'bg-custom-100',
                            )}
                          >
                            <RadioGroupItem
                              id="display-b"
                              value="display-b"
                              className={cn(
                                'absolute left-3 top-3 h-[18px] w-[18px] border-none shadow-none',
                                field.value === 'display-b' && 'bg-green-500',
                              )}
                            />
                            <div className="flex h-full items-center justify-center gap-2">
                              <DisplayAreaItem field={field} payload="display-b" className="h-[52px]" />
                              <DisplayAreaItem field={field} payload="display-b" className="h-[52px]" />
                              <DisplayAreaItem field={field} payload="display-b" className="h-[52px]" />
                            </div>
                          </FormLabel>
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <FormLabel
                            htmlFor="display-c"
                            className={cn(
                              'h-52 w-full cursor-pointer rounded-xl px-[30px] py-[18px]',
                              field.value === 'display-c' ? 'bg-primary-100' : 'bg-custom-100',
                            )}
                          >
                            <RadioGroupItem
                              id="display-c"
                              value="display-c"
                              className={cn(
                                'absolute left-3 top-3 h-[18px] w-[18px] border-none shadow-none',
                                field.value === 'display-c' && 'bg-green-500',
                              )}
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <DisplayAreaItem field={field} payload="display-c" />
                              <DisplayAreaItem field={field} payload="display-c" />
                              <DisplayAreaItem field={field} payload="display-c" />
                              <DisplayAreaItem field={field} payload="display-c" />
                            </div>
                          </FormLabel>
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <FormLabel
                            htmlFor="display-d"
                            className={cn(
                              'h-52 w-full cursor-pointer rounded-xl px-[30px] py-[18px]',
                              field.value === 'display-d' ? 'bg-primary-100' : 'bg-custom-100',
                            )}
                          >
                            <RadioGroupItem
                              id="display-d"
                              value="display-d"
                              className={cn(
                                'absolute left-3 top-3 h-[18px] w-[18px] border-none shadow-none',
                                field.value === 'display-d' && 'bg-green-500',
                              )}
                            />
                            <div className="flex flex-col gap-3">
                              <DisplayAreaItem field={field} payload="display-d" />
                              <DisplayAreaItem field={field} payload="display-d" />
                            </div>
                          </FormLabel>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="secondary" className="w-full max-w-[10rem]" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="w-full max-w-[10rem]">
                Apply
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
