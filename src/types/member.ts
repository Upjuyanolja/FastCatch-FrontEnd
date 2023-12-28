interface memberInfoI {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phone: string;
}

export interface memberResI {
  accessToken: string;
  refreshToken: string;
  memberResponse: memberInfoI;
}
