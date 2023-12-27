export interface RoomDescriptionType {
  cartItemId: number;
  checkInTime: string;
  checkOutTime: string;
  endDate: string;
  headCount: number;
  maxHeadCount: number;
  price: number;
  roomId: number;
  roomName: string;
  startDate: string;
}

export interface CartItemType {
  accommodationName: string;
  accommodationId: number;
  rooms: RoomDescriptionType[];
}
