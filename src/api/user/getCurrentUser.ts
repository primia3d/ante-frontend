import axios from 'axios';

import { TUser } from '@/types/user';

type TGetCurrentUser = {
  message: string;
  myAccountInformation: TUser;
  token: string;
};

export const getCurrentUser = async () => {
  const {
    data: { myAccountInformation },
  } = await axios.get<TGetCurrentUser>(`/account/my_account`);

  return myAccountInformation;
};
