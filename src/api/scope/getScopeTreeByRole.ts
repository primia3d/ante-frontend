import axios from 'axios';

import { TScopeTree } from '@/types/scope';

type TGetScopeTreeByRoleResponse = {
  message: string;
  scopeTree: TScopeTree[];
};

export const getScopeTreeByRole = async ({ id }: { id: string }) => {
  const { data } = await axios.get<TGetScopeTreeByRoleResponse>(`/scope/tree?roleID=${id}`);

  return data.scopeTree;
};
