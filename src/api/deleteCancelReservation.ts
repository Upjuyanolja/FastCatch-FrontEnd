import instance from "./instanceApi";

export const deleteCancelReservation = ({
  reservationId,
}: {
  reservationId: number;
}) => {
  const accessToken = localStorage.getItem("accessToken");
  return instance.delete(`/api/reservations/${reservationId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
