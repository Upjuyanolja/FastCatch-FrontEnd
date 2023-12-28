import { atom, selector } from "recoil";
import { Coupon } from "@/types/accommodationDetail";
export const orderState = atom<OrderItemTypes[]>({
  key: "orderState",
  default: JSON.parse(localStorage.getItem("orderState") || "[]"),
});

export const orderStateFromLocalStorage = selector({
  key: "orderStateFromLocalStorage",
  get: ({ get }) => {
    const storedValue = localStorage.getItem("orderState");
    return storedValue ? JSON.parse(storedValue) : get(orderState);
  },
});
export interface OrderItemTypes {
  accommodationName: string;
  checkInTime: string;
  checkOutTime: string;
  defaultCapacity: number;
  maxCapacity: number;
  price: number;
  discountPrice: number | null;
  id: number;
  roomName: string;
  startDate: string;
  endDate: string;
  cartItemIds?: number[];
  cartItemId?: number;
  coupons: Coupon[];
}
