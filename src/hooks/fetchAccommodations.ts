import instance from "../api/instanceApi";
import { Accommodations } from "@/types/accommodations";

export const fetchAccommodationsData = async (
  REGION: string,
  STARTDATE: string,
  ENDDATE: string,
  CATEGORY: string,
  AMOUNT: number,
  PAGE: number
): Promise<Accommodations> => {
  try {
    const res = await instance.get(
      `/api/accommodations?category=${CATEGORY}&region=${REGION}&startDate=${STARTDATE}&endDate=${ENDDATE}&defaultCount=${AMOUNT}&page=${PAGE}`
    );
    return res.data.data;
  } catch (error) {
    throw new Error("Failed to fetch accs data");
  }
};

export const searchAccommodationByName = async (NAME: string) => {
  try {
    const res = await instance.get(
      `/api/accommodations/search-by-name?query=${NAME}`
    );
    return res.data.data;
  } catch {
    throw new Error("No Valid data with this name");
  }
};
