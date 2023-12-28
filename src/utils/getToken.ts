export const getToken = () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getRefreshToken = () => {
  try {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
