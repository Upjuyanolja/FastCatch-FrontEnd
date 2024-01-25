import { useSetRecoilState } from "recoil";

import { userInfoI, userState } from "@/states/userState";
import { setCookie } from "@/utils/cookies";

export const useAuth = () => {
  const setUserInfo = useSetRecoilState(userState);

  const setToken = (
    accessToken: string,
    refreshToken: string,
    memberRes: userInfoI
  ) => {
    localStorage.setItem("accessToken", accessToken);
    setCookie(refreshToken);
    setUserInfo(memberRes);
  };
  return {
    setToken,
  };
};
