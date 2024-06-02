export type TUserTree = {
  users?: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  }[];
  id: string;
  name: string;
  description: string;
  isDeveloper: boolean;
  isDeleted: boolean;
  updatedAt: {
    dateTime: string;
    time: string;
    date: string;
    dateFull: string;
    raw: string;
  };
  createdAt: {
    dateTime: string;
    time: string;
    date: string;
    dateFull: string;
    raw: string;
  };
  roleGroupId: string;
  level: number;

  child: TUserTree[];
};
