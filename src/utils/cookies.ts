export const setCookie = (refreshToken: string) => {
  try {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    const expirationDateString = expirationDate.toUTCString();
    document.cookie = `refreshToken=${refreshToken};expires=${expirationDateString};path=/;secure;`;
  } catch (e) {
    console.error(e);
    alert("쿠키설정에 실패했습니다.");
  }
};

export function getCookie(name: string): string | undefined {
  const cookieValue = document.cookie
    .split("; ")
    .find(row => row.startsWith(`${name}=`))
    ?.split("=")[1];
  return cookieValue || undefined;
}

export const removeCookie = async () => {
  try {
    document.cookie = "refreshToken=; expires=0; path=/";
  } catch (e) {
    console.error(e);
    alert("쿠키삭제에 실패했습니다.");
  }
};
