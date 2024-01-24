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

interface PostOrderApiRequestBodyType {
  roomId: number;
  visitorName: string;
  visitorPhone: string;
  startDate: string;
  endDate: string;
  couponId?: number;
  totalPrice: number;
  payMethod: string;
}

export interface PostOrderApiErrorResponse {
  message: string;
  name: string;
  stack: string;
  response: {
    data: {
      errorMessage: string;
    };
  };
  config: {
    method: string;
    url: string;
    data: string;
  };
  code: string;
  status: number;
}
