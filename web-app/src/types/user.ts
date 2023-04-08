export type UserInfoType = {
  id: string;
  first_name: string;
  last_name: string;
  token: string;
  verified: boolean;
  username: string;
  cover: string;
  image: string;
};

export type RegisterProps = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  bYear: number;
  bMonth: number;
  bDay: number;
  gender: string;
};

export type UserState = {
  user: UserInfoType | null;
  users: UserInfoType[];
};
