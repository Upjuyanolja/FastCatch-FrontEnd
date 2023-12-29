import { http, HttpResponse } from "msw";
import emailData from "../../public/data/emailData.json";
import successSignUpData from "../../public/data/successSignUpData.json";
import failSignUpData from "../../public/data/failSignUpData.json";
import allAccommodations from "../../public/data/allAccommodations.json";
import accommodationDetailData from "../../public/data/accommodationDetailData.json";
import couponData from "../../public/data/couponData.json";
import successLoginData from "../../public/data/successLoginData.json";
import failLoginData from "../../public/data/failLoginData.json";
import reservationList from "../../public/data/reservationList.json";
import cancelReservationList from "../../public/data/cancelReservationList.json";
import successCancelReservation from "../../public/data/successCancelReservation.json";
import successTokenData from "../../public/data/successTokenData.json";
import successInfoData from "../../public/data/successInfoData.json";
import successLogOutData from "../../public/data/successLogOutData.json";
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

const postSignUpResolver = async () => {
  return HttpResponse.json(successSignUpData, { status: 201 });
};

const getAccommodationResolver = () => {
  return HttpResponse.json(allAccommodations);
};
const getAccommodationDetailData = () => {
  return HttpResponse.json(accommodationDetailData);
};
const getCouponsData = () => {
  return HttpResponse.json(couponData);
};

const getLoginResolver = async () => {
  return HttpResponse.json(successLoginData, { status: 200 });
};

const getReservationListResolver = () => {
  return HttpResponse.json(reservationList);
};

const getCancelReservationListResolver = () => {
  return HttpResponse.json(cancelReservationList);
};

const deleteCancelReservation = () => {
  return HttpResponse.json(successCancelReservation);
};

const postTokenResolver = async ({ request }: any) => {
  const newPost = await request.json();
  return HttpResponse.json(newPost, { status: 200 });
};

const getInfoResolver = () => {
  return HttpResponse.json(successInfoData);
};

const postSignOutResolver = () => {
  return HttpResponse.json(successLogOutData);
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
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodations/detail`,
    getAccommodationDetailData
  ),
  http.get(`${import.meta.env.VITE_API_BASE_URL}/api/coupons`, getCouponsData),
  http.post(`/api/members/signin`, getLoginResolver),
  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservations`,
    getReservationListResolver
  ),
  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservations/cancel`,
    getCancelReservationListResolver
  ),
  http.delete(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservations/:reservationId`,
    deleteCancelReservation
  ),
  http.post(`/api/members/re-token`, postTokenResolver),
  http.get(`/api/members`, getInfoResolver),
  http.post(`/api/members/signout`, postSignOutResolver),
];
