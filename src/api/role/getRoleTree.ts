import axios from 'axios';

import { TRoleTree } from '@/types/roleTree';

type TGetRoleTreeResponse = {
  message: string;
  tree: TRoleTree[];
};

export const getRoleTree = async () => {
  const { data } = await axios.get<TGetRoleTreeResponse>(`/role/tree`);

  return data.tree;
};
