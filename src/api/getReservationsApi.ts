import { ReservationsTypes } from "../types/reservation";
import instance from "./instanceApi";

export const getReservationsApi = async () => {
  try {
    const res = await instance.get("/api/reservations");
    const orderData = res.data.data.orders;

    const reservedOrders =
      orderData.find((order: ReservationsTypes) => order.status === "reserved")
        ?.orderResponses || [];

    const usedOrders =
      orderData.find((order: ReservationsTypes) => order.status === "used")
        ?.orderResponses || [];

    const canceledOrders =
      orderData.find((order: ReservationsTypes) => order.status === "canceled")
        ?.orderResponses || [];
    return { orderData, reservedOrders, usedOrders, canceledOrders };
  } catch (error) {
    console.error(error);
    throw new Error("데이터를 불러올 수 없습니다.");
  }
};
