import axios from 'axios';
import qs from 'qs';

import { TAssignedRoleData } from '@/types/task';

type Params = {
  page: number;
  perPage: number;
  sortType: string;
  currentUserId: string;
  search: string;
};

type TGetAssigneeListResponse = {
  message: string;
  data: {
    list: TAssignedRoleData[];
  };
};

export const getAssigneeList = async (
  params: Params | undefined = {
    page: 1,
    perPage: 20,
    sortType: 'asc',
    currentUserId: '',
    search: '',
  },
) => {
  const queryString = qs.stringify(params ?? {});

  const { data } = await axios.get<TGetAssigneeListResponse>(`/account/search-assignees?${queryString}`);

  return data.data.list;
};
