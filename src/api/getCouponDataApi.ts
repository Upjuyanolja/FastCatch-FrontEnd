import instance from "./instanceApi";

interface Coupon {
  id?: number;
  name?: string;
}

interface Room {
  id: number;
  roomName: string;
  coupons: Coupon[];
}

export const getCouponDataApi = async (id: string | null): Promise<Room[]> => {
  try {
    const res = await instance.get(`/api/coupons/${id}`);
    return res.data.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
