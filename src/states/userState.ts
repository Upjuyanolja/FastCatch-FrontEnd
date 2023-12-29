import { atom, AtomEffect, DefaultValue } from "recoil";

export interface userInfoI {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phone: string;
}

const userStateEffect: AtomEffect<userInfoI | null> = ({ onSet, setSelf }) => {
  const storedValue = localStorage.getItem("userState");
  if (storedValue) {
    setSelf(JSON.parse(storedValue));
  }

  onSet(newValue => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    localStorage.setItem("userState", JSON.stringify(newValue));
  });
};

export const userState = atom<userInfoI | null>({
  key: "userState",
  default: null,
  effects_UNSTABLE: [userStateEffect],
});
