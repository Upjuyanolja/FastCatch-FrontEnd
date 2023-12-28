import axios from "axios";
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

export async function refreshAccessToken() {
  const accessToken = localStorage.getItem("accessToken");
  const userDataString = localStorage.getItem("userState");

  if (!userDataString) {
    console.error("User data not found in localStorage");
    return;
  }

  const userData = JSON.parse(userDataString);
  const userEmail = userData.email;

  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/members/re-token`,
    { email: userEmail },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("토큰 재발급 성공", response.data);
  const newAccessToken = response.data.data.accessToken;
  localStorage.setItem("accessToken", newAccessToken);

  return newAccessToken;
}
