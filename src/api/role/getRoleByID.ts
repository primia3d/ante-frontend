import axios from 'axios';

import { TRole } from '@/types/role';

type TGetRoleByIDResponse = {
  message: string;
  roleInformation: TRole;
};

export const getRoleByID = async ({ id }: { id: string }) => {
  const { data } = await axios.get<TGetRoleByIDResponse>(`/role?id=${id}`);

  return data.roleInformation;
};
