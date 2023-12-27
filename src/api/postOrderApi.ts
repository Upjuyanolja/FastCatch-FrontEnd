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

interface OrderItemType {
  roomId: number;
  startDate: string;
  endDate: string;
  headCount: number;
  orderPrice: number;
}

interface PostOrderApiRequestBodyType {
  ageConsent: boolean;
  reservationPersonName: string;
  reservationPhoneNumber: string;
  totalPrice: number;
  orderItems?: OrderItemType[];
  cartItemIds?: number[];
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
