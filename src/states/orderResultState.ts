import { atom } from "recoil";

export const orderResultState = atom<boolean>({
  key: "orderResultState",
  default: false,
});
