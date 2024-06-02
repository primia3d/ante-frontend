import axios from 'axios';

import { TUserTree } from '@/types/userTree';

type TGetUserTreeResponse = {
  message: string;
  tree: TUserTree[];
};

export const getUserTree = async () => {
  const { data } = await axios.get<TGetUserTreeResponse>(`/user-org/tree`);

  return data.tree;
};
