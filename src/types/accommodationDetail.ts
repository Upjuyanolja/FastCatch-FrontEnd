export interface IRoom {
  price: number;
  id: number;
  name: string;
  options: IRoomOption;
  defaultCapacity: number;
  maxCapacity: number;
  checkInTime: string;
  checkOutTime: string;
  soldOut: boolean;
  description: string;
  images?: Array<Object>;
}

export interface IRoomOption {
  canCooking?: boolean;
  canSmoking?: boolean;
  cityView?: boolean;
  oceanView?: boolean;
  hasNetflix?: boolean;
  hasPetRoom?: boolean;
  hasSmokingRoom?: boolean;
  hasParkingLot?: boolean;
  hasWifi?: boolean;
  hasSwimmingPool?: boolean;
  hasGym?: boolean;
  hasBreakfast?: boolean;
  hasRestaurant?: boolean;
  hasCookingRoom?: boolean;
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
  accommodationOption: IAccommodationOptionsType;
  address: string;
  category: string;
  description: string;
  id: number;
  image: string;
  latitude: string;
  longitude: string;
  name: string;
  phoneNumber: string;
  region: string;
  rooms: Array<IRoom>;
}
