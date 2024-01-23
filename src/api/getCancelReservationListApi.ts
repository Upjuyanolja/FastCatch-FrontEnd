import { ResponseReservation } from "./getReservationListApi";
import instance from "./instanceApi";

export const getCancelReservationList = ({ page = 1 }) => {
  return instance.get<ResponseReservation>("/api/reservations", {
    params: {
      page,
      status: "CANCELLED",
    },
  });
};
