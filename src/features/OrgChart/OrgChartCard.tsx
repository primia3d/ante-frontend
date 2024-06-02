import { useMutation, useQuery } from '@tanstack/react-query';

import { RoleForm, RoleFormProps } from '../Role';

import { createRole } from '@/api/role';
import { getRoleTree } from '@/api/role/getRoleTree';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { useToast } from '@/components/Toaster';
import { TRoleTree } from '@/types/roleTree';

type OrgChartCardProps = {
  role: TRoleTree;
};

export function OrgChartCard({ role }: OrgChartCardProps) {
  const { toast } = useToast();

  const { refetch } = useQuery({
    queryKey: ['getRoleTree'],
    queryFn: () => getRoleTree(),
  });

  const createRoleMutation = useMutation({
    mutationFn: createRole,
  });

  const handleSubmit: RoleFormProps['onSubmit'] = async (values) => {
    try {
      await createRoleMutation.mutateAsync({
        name: values.name,
        description: values.description,
        placement: values.placement,
        scopeIDs: values.scopeIDs,
        roleGroupId: values.roleGroupId,
        parentRoleId: values.parentRoleId,
        select: values.select,
      });

      await refetch();

      toast({
        description: 'New Role has successfully created!',
        className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    } catch (error) {
      toast({
        description: 'Oops! something went wrong',
        className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    }
  };
  const { name, level } = role;

  return (
    <Card className="relative mx-auto max-w-[16rem] shadow-none">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>(Level {level || 0})</CardDescription>
      </CardHeader>
      <RoleForm variant="add" onSubmit={handleSubmit} parentRoleId={role.id} roleGroupId={role.roleGroupId} />
    </Card>
  );
}
