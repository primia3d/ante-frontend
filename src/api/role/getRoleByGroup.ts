import axios from 'axios';

import { TRole } from '@/types/role';

type TGetRoleGroupByIDResponse = {
  message: string;
  list: TRole[];
};

export const getRoleByGroup = async ({ id }: { id: string }) => {
  const { data } = await axios.get<TGetRoleGroupByIDResponse>(`/role/by-group?roleGroupId=${id}`);

  return data.list;
};
