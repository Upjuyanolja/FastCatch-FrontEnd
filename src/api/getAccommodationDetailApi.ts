import instance from "./instanceApi";
import { IAccommodationDetail } from "../types/accommodationDetail";

export const getAccommodationDetailApi = async (
  id: string | null,
  startDate: string,
  endDate: string
): Promise<IAccommodationDetail> => {
  try {
    const res = await instance.get(
      `/api/accommodations/${id}?startDate=${startDate}&endDate=${endDate}`
    );
    return res.data.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
