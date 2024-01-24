import { Coupon } from "@/types/accommodationDetail";
import { atom } from "recoil";

export const usedCouponState = atom<Coupon | null>({
  key: "usedCouponState",
  default: null,
});
