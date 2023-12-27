import { atom } from "recoil";

export const categoryState = atom<string>({
  key: "categoryState",
  default: "ALL",
});

export const hasCouponState = atom<boolean>({
  key: "hasCouponState",
  default: false,
});
