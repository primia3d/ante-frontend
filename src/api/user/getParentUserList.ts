import axios from 'axios';

type TParentUser = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

type TGetParentUserListResponse = {
  message: string;
  parentUserDropdownList: TParentUser[];
};

export const getParentUserList = async (lastRoleCreated: string) => {
  const { data } = await axios.get<TGetParentUserListResponse>(`/user-org/parent-list?id=${lastRoleCreated}`);
  return data.parentUserDropdownList;
};
