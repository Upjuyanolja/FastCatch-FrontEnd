import { ResponseReservation } from "./getReservationListApi";
import instance from "./instanceApi";

export const getCancelReservationList = ({ page = 1 }) => {
  const accessToken = localStorage.getItem("accessToken");
  return instance.get<ResponseReservation>("/api/reservations/cancel", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    params: {
      page,
    },
  });
};
