import { useMutation } from '@tanstack/react-query';

import { UserForm, UserFormProps } from '../User';

import { createUser } from '@/api/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { useToast } from '@/components/Toaster';
import { useBoolean } from '@/hooks/useBoolean';
import { TUserTree } from '@/types/userTree';

type UserOrgChartCardProps = {
  user: TUserTree;
};

export function UserOrgChartCard({ user }: UserOrgChartCardProps) {
  const { toast } = useToast();
  const { value: isFormOpen, set: setIsFormOpen } = useBoolean(false);

  const createMutation = useMutation({
    mutationFn: createUser,
  });

  const handleSubmit: UserFormProps['onSubmit'] = async (values) => {
    await createMutation.mutateAsync(values);
    setIsFormOpen(false);
    toast({
      description: 'New user has successfully created!',
      className: 'bg-green-700/80 text-white border border-green-500 rounded-none text-center',
      duration: 3000,
    });
  };

  const values: UserFormProps['values'] = {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    // address: '',
    username: '',
    password: '',
    roleID: '',
    parentUserId: '',
  };

  const { users, name, level } = user;

  return (
    <Card className="relative mx-auto max-w-[16rem] shadow-none">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>(Level {level || 0})</CardDescription>
      </CardHeader>

      {!!users && !!users.length && (
        <CardContent>
          <ul className="list-inside list-disc">
            {users.map(({ firstName, id, lastName }) => (
              <li key={id} className="list-item truncate text-left">
                {`${firstName} ${lastName}`}
              </li>
            ))}
          </ul>
        </CardContent>
      )}

      <UserForm
        variant="add"
        onSubmit={handleSubmit}
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        title="New User"
        label="Add User"
        values={values}
      />
    </Card>
  );
}
