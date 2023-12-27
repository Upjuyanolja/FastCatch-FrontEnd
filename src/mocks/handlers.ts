import { http, HttpResponse } from "msw";
import emailData from "../../public/data/emailData.json";
import successSignUpData from "../../public/data/successSignUpData.json";
import failSignUpData from "../../public/data/failSignUpData.json";
import allAccommodations from "../../public/data/allAccommodations.json";
import reservationList from "../../public/data/reservationList.json";

// const getHotelResolver = () => {
//   return HttpResponse.json(accommodationDetail);
// };
// const postHotelResolver = async ({ request }: any) => {
//   const newPost = await request.json();
//   console.log("newPost", newPost);

//   return HttpResponse.json(newPost, { status: 201 });
// };

// const getAccommodationResolver = () => {
//   return HttpResponse.json(allAccommodations);
// };
const email = "ivegaeul@naver.com";
const getEmailIsDuplicatedResolver = () => {
  return HttpResponse.json(emailData);
};

const postSignUpResolver = async ({ request }: any) => {
  const newPost = await request.json();
  console.log("newPost", newPost);

  return HttpResponse.json(successSignUpData, { status: 201 });
};

const getAccommodationResolver = () => {
  return HttpResponse.json(allAccommodations);
};

const getReservationListResolver = () => {
  return HttpResponse.json(reservationList);
};

const getCancelReservationListResolver = () => {
  return HttpResponse.json(reservationList);
};

export const handlers = [
  //
  // http.get("/accommodation", getHotelResolver),
  // http.post("/accommodation", postHotelResolver),
  // http.get("/accomodations", getAccommodationResolver),
  http.get(`/api/members/email?email=${email}`, getEmailIsDuplicatedResolver),
  http.post(`/api/members/signup`, postSignUpResolver),
  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodations`,
    getAccommodationResolver
  ),
  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservations`,
    getReservationListResolver
  ),
  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservations/cancel`,
    getCancelReservationListResolver
  ),
];
