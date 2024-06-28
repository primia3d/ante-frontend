import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';

import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Dialog';
import { Form } from '@/components/Form';
import { Stepper, StepperContent, StepperItem } from '@/components/Stepper';
import { userFormSchema } from '@/schema/userSchema';
import { TUserFormSchema } from '@/types/user';

export type UserFormProps = {
  values: TUserFormSchema;
  onSubmit: (values: TUserFormSchema) => void | Promise<void>;
  label: string;
  title: string;
  variant: 'add' | 'edit' | 'create';
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  roleGroupId?: string;
  parentAccountId?: string;
};

function renderButton(variant: 'create' | 'edit' | 'add') {
  switch (variant) {
    case 'edit':
      return (
        <Button variant="secondary" className="h-8 font-normal">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      );
    case 'create':
      return (
        <Button variant="primary">
          <Plus className="h-4 w-4" />
          Create User
        </Button>
      );
    case 'add':
      return (
        <Button className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full border bg-primary-100 text-white hover:bg-primary-100/90">
          <Plus className="h-4 w-4" />
        </Button>
      );
    default:
      return null;
  }
}

export function UserForm({
  values,
  onSubmit,
  isOpen,
  setIsOpen,
  title,
  variant,
  parentAccountId,
  roleGroupId,
}: UserFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userParentIdValue, setUserParentIdValue] = useState(parentAccountId || '');

  const form = useForm<TUserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: values,
  });

  const handleStep = (type: 'prev' | 'next') => async () => {
    let isValid = type === 'prev';

    if (type === 'next' && currentStep === 1)
      isValid = await form.trigger([
        'firstName',
        'lastName',
        'email',
        'contactNumber',
        'parentAccountId',
        // 'address'
      ]);

    if (type === 'next' && currentStep === 2) isValid = await form.trigger(['username', 'password', 'roleID']);

    if (isValid) setCurrentStep(type === 'prev' ? currentStep - 1 : currentStep + 1);
  };

  useEffect(() => {
    if (isOpen) {
      setUserParentIdValue(parentAccountId || '');
    }
  }, [isOpen, parentAccountId]);

  useEffect(() => {
    const updatedValues = {
      ...values,
      parentUserId: parentAccountId || '',
    };
    form.reset(updatedValues);
    setCurrentStep(1);
  }, [form, isOpen, values, roleGroupId, parentAccountId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{renderButton(variant)}</DialogTrigger>
      <DialogContent className="overflow-y-auto rounded-2xl border-none bg-white text-[13px] sm:max-w-xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-6 w-6 -translate-y-0.5 rounded-none bg-background p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              // onClick={() => }
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 p-5 sm:px-12">
            <Stepper>
              <StepperItem active={currentStep === 1} number={1} currentStep={currentStep} title="Basic Details" />
              <StepperItem active={currentStep === 2} number={2} currentStep={currentStep} title="Role & Access" />
              <StepperItem active={currentStep === 3} number={3} currentStep={currentStep} title="Review" />
            </Stepper>

            <StepperContent
              currentStep={currentStep}
              items={[
                {
                  component: Step1,
                  props: {
                    parentAccountId,
                    setUserParentIdValue,
                    variant,
                    userParentIdValue,
                  },
                },
                { component: Step2 },
                { component: Step3 },
              ]}
            />

            <div className="flex justify-end gap-3">
              {currentStep !== 1 && (
                <Button type="button" variant="secondary" onClick={handleStep('prev')} className="w-full max-w-24">
                  Back
                </Button>
              )}
              {currentStep !== 3 && (
                <Button type="button" variant="primary" onClick={handleStep('next')} className="w-full max-w-24">
                  Next
                </Button>
              )}
              {currentStep === 3 && (
                <Button type="submit" variant="primary" className="w-full max-w-24">
                  {variant === 'edit' ? 'Save' : 'Create'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
