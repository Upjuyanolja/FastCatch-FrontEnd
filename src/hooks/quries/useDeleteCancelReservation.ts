import { deleteCancelReservation } from "@/api/deleteCancelReservation";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteCancelReservation = ({
  reservationId,
}: {
  reservationId: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteCancelReservation({ reservationId }), {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "reservations-list",
        "cancelReservations-list",
      ]);
      //msw 사용으로 인해 확인을 위한 임시 console
      console.log(reservationId + "번 숙소 삭제 완료");
    },
  });
};
