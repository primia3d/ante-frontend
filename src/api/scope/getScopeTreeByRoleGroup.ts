import axios from 'axios';

import { TScopeTree } from '@/types/scope';

type TGetScopeTreeByRoleGroupResponse = {
  message: string;
  scopeTree: TScopeTree[];
};

export const getScopeTreeByRoleGroup = async ({ id }: { id: string }) => {
  const { data } = await axios.get<TGetScopeTreeByRoleGroupResponse>(`/scope/list?roleGroupId=${id}`);

  return data.scopeTree;
};
