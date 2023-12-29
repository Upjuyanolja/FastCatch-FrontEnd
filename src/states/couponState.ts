import { atom } from "recoil";

type CouponType = {
  id: number;
  name: string;
  price: number;
};

export const couponState = atom<CouponType | null>({
  key: "couponState",
  default: null,
});
