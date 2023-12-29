import AccommodationGuest from "@/components/accommodationGuest/AccommodationGuest";
import HotelName from "@/components/accommodationName/AccommodationName";
import RoomName from "@/components/roomName/RoomName";
import CheckIn from "@/components/checkIn/CheckIn";
import CheckOut from "@/components/checkOut/CheckOut";
import OrderPrice from "@/pages/order/orderPrice/OrderPrice";
import { useRecoilValue } from "recoil";
import { discountState } from "@/states/discountState";
import { calculateNightStay } from "@/utils/calculateNightStay";
import { memo } from "react";
import { Badge } from "@/components/common";
import englishToKoreanFormat from "@/utils/englishToKoreanFormat";
import { ROOM_OPTIONS } from "@/constant/roomOptions";
import "./orderItem.scss";
import { Options } from "@/states/orderState";

const OrderItem = memo(({ orderData }: OrderItemProps) => {
  const {
    accommodationName,
    roomName,
    defaultCapacity,
    maxCapacity,
    startDate,
    checkInTime,
    endDate,
    checkOutTime,
    price,
    options,
  } = orderData;

  const discountAmt = useRecoilValue(discountState);

  return (
    <div className="order-item">
      <div className="order-item__name">
        <HotelName hotelName={accommodationName} />
        <RoomName roomName={roomName} />
      </div>
      <div className="order-item__guest">
        <AccommodationGuest minimum={defaultCapacity} maximum={maxCapacity} />
      </div>
      <div className="order-item__room-option">
        {englishToKoreanFormat(options, ROOM_OPTIONS).map((option: any) => (
          <Badge key={option} text={option} badgeStatus="gray" />
        ))}
      </div>
      <div className="order-item__info">
        <div className="order-item__check">
          <CheckIn checkInDate={startDate} checkInTime={checkInTime} />
          <CheckOut checkOutDate={endDate} checkOutTime={checkOutTime} />
        </div>
        <OrderPrice
          nightCount={calculateNightStay(startDate, endDate)}
          roomPrice={price - discountAmt}
        />
      </div>
    </div>
  );
});

export default OrderItem;

interface OrderItemProps {
  orderData: {
    accommodationName: string;
    roomName: string;
    defaultCapacity: number;
    maxCapacity: number;
    startDate: string;
    checkInTime: string;
    endDate: string;
    checkOutTime: string;
    price: number;
    options: Options;
  };
}
