export interface Reservation {
  orderId: number;
  orderStatus: string;
  orderDate: string;
  totalPrice: number;
  reservationPersonName: string;
  reservationPhoneNumber: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  accommodationId: number;
  accommodationName: string;
  roomId: number;
  roomName: string;
  checkInTime: string;
  checkOutTime: string;
  startDate: string;
  endDate: string;
  headCount: number;
  maxHeadCount: number;
  orderPrice: number;
}

export interface ReservationsTypes {
  status: string;
  pageSize: number;
  pageNum: number;
  orderResponses: Reservation[];
}
