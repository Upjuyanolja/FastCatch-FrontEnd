export const setCookie = (refreshToken: string) => {
  try {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    const expirationDateString = expirationDate.toUTCString();
    document.cookie = `refreshToken=${refreshToken};expires=${expirationDateString};path=/;secure;httpOnly`;
  } catch (e) {
    console.error(e);
    alert("쿠키설정에 실패했습니다.");
  }
};
