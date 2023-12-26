import {
  ResponseAccommodation,
  getAllAccommodations,
} from "@/api/getAllAccommodationsApi";
import { AxiosError, AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";

export const useGetAllAccommodations = (
  category: string,
  hasCoupon: boolean
) => {
  return useInfiniteQuery<
    AxiosResponse<ResponseAccommodation>,
    AxiosError,
    AxiosResponse<ResponseAccommodation>
  >(
    ["accommodations-list"],
    ({ pageParam = 1 }) =>
      getAllAccommodations({ page: pageParam, category, hasCoupon }),
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
