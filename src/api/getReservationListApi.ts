import instance from "./instanceApi";

export type Reservation = {
  id: number;
  date: string;
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
  isCouponUsed: boolean;
  roomPrice: number;
  totalAmount: number;
};

export type ResponseReservation = {
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
  reservations: Reservation[];
};

export const getReservationList = ({ page = 0 }) => {
  return instance.get<ResponseReservation>("/api/reservations", {
    params: {
      page,
    },
  });
};
