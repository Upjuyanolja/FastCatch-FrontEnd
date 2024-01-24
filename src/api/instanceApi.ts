import axios, { AxiosInstance } from "axios";

import { isAccessTokenExpired } from "@/utils/checkToken";
import { getCookie, removeCookie, setCookie } from "@/utils/cookies";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  async config => {
    config.headers["Content-Type"] = "application/json";
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = getCookie("refreshToken");
    if (accessToken) {
      const isTokenExpired = isAccessTokenExpired(accessToken);
      if (isTokenExpired) {
        try {
          const res = await instance.post("/api/auth/refresh", {
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          const newAccessToken = res.data.accessToken;
          const newRefreshToken = res.data.refreshToken;
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          localStorage.setItem("accessToken", newAccessToken);
          setCookie(newRefreshToken);
        } catch (refreshError) {
          localStorage.clear();
          removeCookie();
          window.location.replace("/login");
        }
      } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    } else {
      localStorage.clear();
      removeCookie();
      window.location.replace("/login");
    }
    return config;
  },
  error => {
    localStorage.clear();
    removeCookie();
    window.location.replace("/login");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      removeCookie();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
