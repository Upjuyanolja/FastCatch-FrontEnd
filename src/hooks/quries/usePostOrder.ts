import { postOrderApi } from "@/api/postOrderApi";
import { orderResultState } from "@/states/orderResultState";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

export const usePostOrder = (orderData: OrderData) => {
  const setOrderResult = useSetRecoilState(orderResultState);
  const navigate = useNavigate();
  const postOrderMutation = useMutation(
    () => postOrderApi("/api/reservations", orderData),
    {
      onSuccess: () => {
        navigate("/order/result?=true");
        setOrderResult(true);
      },
      onError: () => {
        navigate("/order/result?=false");
        setOrderResult(false);
      },
    }
  );

  const isLoading = postOrderMutation.isLoading;

  return {
    ...postOrderMutation,
    isLoading,
  };
};

interface OrderData {
  roomId: number;
  visitorName: string;
  visitorPhone: string;
  startDate: string;
  endDate: string;
  couponId?: number;
  totalPrice: number;
  payMethod: string;
}
