import instance from "./instanceApi";

export const deleteCancelReservation = ({
  reservationId,
}: {
  reservationId: number;
}) => {
  return instance.delete(`/api/reservations/${reservationId}`);
};
