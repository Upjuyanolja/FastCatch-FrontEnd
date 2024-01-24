import {
  Accommodations,
  getAllAccommodations,
} from "@/api/getAllAccommodationsApi";
import { AxiosError, AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";

export const useGetAllAccommodations = (
  category: string,
  onlyHasCoupon: boolean,
  keyword: string
) => {
  return useInfiniteQuery<
    AxiosResponse<Accommodations>,
    AxiosError,
    AxiosResponse<Accommodations>
  >(
    ["accommodations-list"],
    ({ pageParam = 0 }) =>
      getAllAccommodations({
        page: pageParam,
        category,
        onlyHasCoupon,
        keyword,
      }),
    {
      getNextPageParam: ({ data: { pageNum, totalPages } }) => {
        const nextPage = pageNum + 1;
        return totalPages > pageNum ? nextPage : undefined;
      },
    }
  );
};
