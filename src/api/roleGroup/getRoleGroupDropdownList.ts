import axios from 'axios';

import { TRoleGroup } from '../../types/roleGroup';

type TGetRoleGroupByIDResponse = {
  message: string;
  roleGroupInformation: TRoleGroup[];
};

export const getRoleGroupDropdownList = async () => {
  const { data } = await axios.get<TGetRoleGroupByIDResponse>(`/role-group/dropdown-list`);

  return data.roleGroupInformation;
};
