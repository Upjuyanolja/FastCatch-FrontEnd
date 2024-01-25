import axios, { AxiosInstance } from "axios";
import { getCookie, removeCookie, setCookie } from "@/utils/cookies";
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      if (error.response?.data && "code" in error.response.data) {
        // 리프레시 토큰이 유효하지 않을 때
        if (error.response.data.code === 1001) {
          alert("로그인 만료입니다.");
          localStorage.clear();
          removeCookie();
          window.location.replace("/login");
        }
      } else {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const res = await instance.post("/api/auth/refresh", {
            accessToken: accessToken,
            refreshToken: getCookie("refreshToken") as string,
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          setCookie(res.data.refreshToken);
        } else {
          localStorage.removeItem("accessToken");
          removeCookie();
          window.location.replace("/login");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
