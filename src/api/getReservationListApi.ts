import instance from "./instanceApi";

export type Reservation = {
  id: number;
  date: string;
  totalPrice: number;
  accommodationId: number;
  accommodationName: string;
  roomId: number;
  roomName: number;
  checkInTime: string;
  checkOutTime: string;
  startDate: string;
  endDate: string;
  defaultCapacity: number;
  maxCapacity: number;
  coupon: boolean;
  basePrice: number;
};

export type Reservations = {
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
  reservations: Reservation[];
};

export type ResponseReservation = {
  message: string;
  data: Reservations;
};

export const getReservationList = ({ page = 1 }) => {
  const accessToken = localStorage.getItem("accessToken");
  return instance.get<ResponseReservation>("/api/reservations", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    params: {
      page,
    },
  });
};
