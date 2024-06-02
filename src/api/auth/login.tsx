import axios from 'axios';

import { TLoginSchema } from '@/types/auth';
import { TUser } from '@/types/user';

type TLoginResponse = {
  message: string;
  accountInformation: TUser;
  token: string;
};

export const doLogin = async (params: TLoginSchema) => {
  const { data } = await axios.post<TLoginResponse>('/auth/login', params);

  return data;
};
