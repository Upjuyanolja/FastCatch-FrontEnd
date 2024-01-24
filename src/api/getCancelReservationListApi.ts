import { ResponseReservation } from "./getReservationListApi";
import instance from "./instanceApi";

export const getCancelReservationList = ({ page = 0 }) => {
  return instance.get<ResponseReservation>("/api/reservations", {
    params: {
      page,
      status: "CANCELLED",
    },
  });
};
