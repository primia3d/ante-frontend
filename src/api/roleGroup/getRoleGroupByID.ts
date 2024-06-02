import axios from 'axios';

import { TRoleGroup } from '../../types/roleGroup';

type TGetRoleGroupByIDResponse = {
  message: string;
  roleGroupInformation: TRoleGroup;
};

export const getRoleGroupByID = async ({ id }: { id: string }) => {
  const { data } = await axios.get<TGetRoleGroupByIDResponse>(`/role-group?id=${id}`);

  return data.roleGroupInformation;
};
