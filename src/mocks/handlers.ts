import { http, HttpResponse } from "msw";
import allAccommodations from "../../public/data/allAccommodations.json";

const getAccommodationResolver = () => {
  return HttpResponse.json(allAccommodations);
};

export const handlers = [
  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodations`,
    getAccommodationResolver
  ),
];
