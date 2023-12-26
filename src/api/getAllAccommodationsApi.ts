import instance from "./instanceApi";

export type AccommodationParams = {
  category: string;
  page: number;
  hasCoupon: boolean;
};
export type Accommodation = {
  id: number;
  name: string;
  address: string;
  category: string;
  lowestPrice: number;
  discountPrice: number;
  imageUrl: string;
  soldOut: boolean;
  coupon: string;
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
  hasCoupon = false,
  page = 1,
}: AccommodationParams) => {
  return instance.get<ResponseAccommodation>("/api/accommodations", {
    params: {
      category,
      hasCoupon,
      page,
    },
  });
};
