import { useInfiniteQuery } from "react-query";
import { ResponseReservation } from "../../api/getReservationListApi";
import { AxiosError, AxiosResponse } from "axios";
import { getCancelReservationList } from "@/api/getCancelReservationListApi";

export const useGetCancelReservationList = () => {
  return useInfiniteQuery<
    AxiosResponse<ResponseReservation>,
    AxiosError,
    AxiosResponse<ResponseReservation>
  >(
    ["cancelReservations-list"],
    ({ pageParam = 0 }) => getCancelReservationList({ page: pageParam }),
    {
      getNextPageParam: ({ data: { pageNum, totalPages } }) => {
        const nextPage = pageNum + 1;
        return totalPages > pageNum ? nextPage : undefined;
      },
    }
  );
};
