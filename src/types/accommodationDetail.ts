export interface Coupon {
  id: number;
  name: string;
  price: number;
}
export interface IRoom {
  basePrice: number;
  id: number;
  name: string;
  roomOption: IRoomOption;
  defaultCapacity: number;
  maxCapacity: number;
  checkInTime: string;
  checkOutTime: string;
  soldOut: boolean;
  description: string;
  images?: Array<Object>;
  discountPrice: number | null;
  coupons: Coupon[];
  count: number;
}

export interface IRoomOption {
  airCondition?: boolean;
  tv?: boolean;
  internet?: boolean;
}

export interface IAccommodationOptionsType {
  barbecue: boolean;
  cooking: boolean;
  fitness: boolean;
  karaoke: boolean;
  parking: boolean;
  pickup: boolean;
  sauna: boolean;
  seminar: boolean;
  sports: boolean;
}
export interface IAccommodationDetail {
  option: IAccommodationOptionsType;
  address: string;
  category: string;
  description: string;
  id: number;
  images: string[];
  // latitude: string;
  // longitude: string;
  name: string;
  phoneNumber: string;
  region: string;
  rooms: Array<IRoom>;
  mainCoupon: string;
}
