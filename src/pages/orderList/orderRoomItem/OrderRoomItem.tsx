import { RoomInfo } from "@/types/roomInfo";
import { getDayOfWeek } from "@/utils/getDayOfWeek";
import numberFormat from "@/utils/numberFormat";

import "./orderRoomItem.scss";
import { calculateNightStay } from "@/utils/calculateNightStay";

const OrderRoomItem = ({ roomInfo }: RoomPropsType) => {
  const {
    roomName,
    startDate,
    endDate,
    headCount,
    maxHeadCount,
    checkInTime,
    checkOutTime,
    orderPrice,
    accommodationName,
  } = roomInfo;

  const sliceCheckInTime = checkInTime.slice(0, -3);
  const sliceCheckOutTime = checkOutTime.slice(0, -3);
  const formattedOrderPrice = numberFormat(orderPrice);

  return (
    <div className="order-room__item">
      <div className="item-content">
        <div className="item-content__left-box">
          <p className="text-subtitle4">
            {accommodationName} ({roomName})
          </p>
          <div>
            <p className="text-body1">
              {startDate} {getDayOfWeek(startDate)} - {endDate}{" "}
              {getDayOfWeek(endDate)}{" "}
              {`(${calculateNightStay(startDate, endDate)}`}
              {"박)"}
            </p>
            <p className="text-body1">
              인원 {headCount}인 / 최대 {maxHeadCount}인
            </p>
            <div className="check-in-out">
              <div className="check-in-out__content">
                <span className="check-in__span">체크인</span>
                <span>{sliceCheckInTime}</span>
              </div>
              <div className="check-in-out__retangle">|</div>
              <div className="check-in-out__content">
                <span className="check-in__span">체크아웃</span>
                <span>{sliceCheckOutTime}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item-content__right-box">
          <span className="price text-body2">500,000원</span>
          <div className="applyCoupon-container">
            <div className="coupon-box">쿠폰가</div>
            <span className="applyCoupon-price text-subtitle5">
              {formattedOrderPrice}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRoomItem;

interface RoomPropsType {
  roomInfo: RoomInfo;
}
