import axios, { AxiosInstance } from "axios";

import { refreshAccessToken } from "@/hooks/useAuth";
import { isAccessTokenExpired } from "@/utils/checkToken";
import { removeCookie } from "@/utils/cookies";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  async config => {
    config.headers["Content-Type"] = "application/json";
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const isTokenExpired = isAccessTokenExpired(accessToken);

      if (isTokenExpired) {
        try {
          const newAccessToken = await refreshAccessToken();
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        } catch (refreshError) {
          console.error("accessToken 재발급 실패", refreshError);
        }
      } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      removeCookie();
      alert("인증이 만료되어 재 로그인이 필요합니다.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
