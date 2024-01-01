import instance from "./instanceApi";

export const postOrderApi = async (
  url: string,
  requestBody: PostOrderApiRequestBodyType
) => {
  try {
    const res = await instance.post(url, requestBody);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("데이터를 전송하지 못했습니다.");
  }
};

export interface PostOrderApiRequestBodyType {
  visitorName: string;
  visitorPhone: string;
  roomId: number;
  startDate: string;
  endDate: string;
  couponId: number | undefined;
  totalPrice: number;
}