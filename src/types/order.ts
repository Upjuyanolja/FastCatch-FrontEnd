export interface Order {
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
  defaultCount: number;
  maxDefaultCount: number;
  orderPrice: number;
}

export interface OrderDataTypes {
  status: string;
  pageSize: number;
  pageNum: number;
  orderResponses: Order[];
}
