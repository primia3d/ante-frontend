import axios from 'axios';

import { TRoleGroup } from '../../types/roleGroup';

type Params = {
  id: string;
};

type TDeleteRoleGroupResponse = {
  message: string;
  roleGroupInformation: TRoleGroup;
};

export const deleteRoleGroup = async (params: Params) => {
  return axios.delete<TDeleteRoleGroupResponse>('/role-group', { data: { id: params.id } });
};
