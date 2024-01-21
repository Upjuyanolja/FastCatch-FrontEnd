import { atom } from "recoil";

export const discountState = atom({
  key: "discount",
  default: 0,
});
