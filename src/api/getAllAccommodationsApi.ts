import instance from "./instanceApi";

export type AccommodationParams = {
  category: string;
  page: number;
  onlyHasCoupon: boolean;
  keyword: string;
};
export type Accommodation = {
  id: number;
  name: string;
  address: string;
  category: string;
  lowestPrice: number;
  discountPrice: number;
  thumbnail: string;
  soldOut: boolean;
  couponName: string;
};
export type Accommodations = {
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
  accommodations: Accommodation[];
};
export type ResponseAccommodation = {
  message: string;
  data: Accommodations;
};

export const getAllAccommodations = ({
  category = "string",
  onlyHasCoupon = false,
  keyword = "",
  page = 0,
}: AccommodationParams) => {
  console.log(keyword);
  if (keyword === "")
    return instance.get<Accommodations>("/api/accommodations", {
      params: {
        category,
        onlyHasCoupon,
        page,
      },
    });
  return instance.get<Accommodations>("/api/accommodations", {
    params: {
      category,
      onlyHasCoupon,
      page,
      keyword,
    },
  });
};
