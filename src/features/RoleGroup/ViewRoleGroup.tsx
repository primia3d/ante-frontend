import { Eye, X } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';

import { RoleGroupForm } from './RoleGroupForm';

import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Dialog';
import { useBoolean } from '@/hooks/useBoolean';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { getScopeTreeByRoleGroup } from '@/api/scope';

type ViewRoleGroupProps = {
  id: string;
  name: string;
  description: string;
};

export default function ViewRoleGroup({ id, description, name }: ViewRoleGroupProps) {
  const { value: isViewRoleOpen, set: setIsViewRoleOpen } = useBoolean(false);
  const { data: scopeTreeByRoleGroupData = [] } = useQuery({
    queryKey: ['getScopeTreeByRoleGroup', id],
    queryFn: () => getScopeTreeByRoleGroup({ id }),
  });

  const handleReset = () => {
    setIsViewRoleOpen(false);
  };

  return (
    <Dialog open={isViewRoleOpen} onOpenChange={setIsViewRoleOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-8 font-normal">
          <Eye className="h-4 w-4" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full overflow-y-auto overflow-x-hidden rounded-xl border-none bg-white text-[13px] sm:max-w-xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-2">
          <DialogTitle>{name}</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-6 w-6 -translate-y-0.5 rounded-none bg-background p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={handleReset}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-5 p-5 sm:p-8">
          <section>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-gray-500">Details</h4>
              <RoleGroupForm
                onSubmit={() => {}}
                variant="edit"
                values={{
                  description,
                  name,
                }}
              />
            </div>
            <div className="w-full ">
              <h1 className="mb-2 text-xl font-semibold">{name}</h1>
              <DialogDescription className="break-all">{description}</DialogDescription>
            </div>
          </section>
          <section>
            <h4 className="text-base font-semibold text-gray-500">Scopes</h4>
            <div className="relative h-72 w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scopeTreeByRoleGroupData?.length > 0 ? (
                    scopeTreeByRoleGroupData.map((scope) => (
                      <TableRow key={scope.id}>
                        <TableCell className="w-[100px]">{scope.id}</TableCell>
                        <TableCell>{scope.name}</TableCell>
                        <TableCell>{scope.description}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No available scopes for this Role Group
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
