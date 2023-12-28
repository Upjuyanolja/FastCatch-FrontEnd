import { useInfiniteQuery } from "react-query";
import {
  ResponseReservation,
  getReservationList,
} from "../../api/getReservationListApi";
import { AxiosError, AxiosResponse } from "axios";

export const useGetReservationList = () => {
  return useInfiniteQuery<
    AxiosResponse<ResponseReservation>,
    AxiosError,
    AxiosResponse<ResponseReservation>
  >(
    ["reservations-list"],
    ({ pageParam = 1 }) => getReservationList({ page: pageParam }),
    {
      getNextPageParam: ({
        data: {
          data: { pageNum, totalPages },
        },
      }) => {
        const nextPage = pageNum + 1;
        return totalPages > pageNum ? nextPage : undefined;
      },
    }
  );
};
