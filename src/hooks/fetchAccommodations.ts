import axios from "axios";

export const fetchAccommodationsData = async (
  REGION: string,
  STARTDATE: string,
  ENDDATE: string,
  CATEGORY: string,
  AMOUNT: number,
  PAGE: number
) => {
  try {
    const res = await axios.get(
      `http://54.180.97.194/api/accommodations?category=${CATEGORY}&region=${REGION}&startDate=${STARTDATE}&endDate=${ENDDATE}&headCount=${AMOUNT}&page=${PAGE}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch accs data");
  }
};

export const searchAccommodationByName = async (NAME: string) => {
  try {
    const res = await axios.get(
      `http://54.180.97.194/api/accommodations/search-by-name?query=${NAME}`
    );
    return res.data.data;
  } catch {
    throw new Error("No Valid data with this name");
  }
};
