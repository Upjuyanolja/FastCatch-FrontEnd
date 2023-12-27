import { Badge, Button, ToastLayout } from "@/components/common";
import { filterState } from "@/states/filterState";
import { orderState } from "@/states/orderState";
import { userState } from "@/states/userState";
import { IRoom } from "@/types/accommodationDetail";
import countDays from "@/utils/countDays";
import englishToKoreanFormat from "@/utils/englishToKoreanFormat";
import numberFormat from "@/utils/numberFormat";
import { format } from "date-fns";
import _debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { IoPeople } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface RoomInfoProps {
  room: IRoom;
  accommodationId: number;
  accommodationName: string;
  isClicked: boolean;
}
interface Template {
  [key: string]: string;
}

const RoomInfo = ({ room, accommodationName, isClicked }: RoomInfoProps) => {
  const {
    name,
    price,
    roomOption,
    roomId,
    baseHeadCount,
    maxHeadCount,
    checkInTime,
    checkOutTime,
    soldOut,
  } = room;

  const setOrderData = useSetRecoilState(orderState);
  const navigate = useNavigate();

  const userData = useRecoilValue(userState);

  const filterData = useRecoilValue(filterState).current;
  const startDate = format(filterData.startDate, "yyyy-MM-dd");
  const endDate = filterData.endDate
    ? format(filterData.endDate, "yyyy-MM-dd")
    : format(filterData.startDate, "yyyy-MM-dd");
  const countDay = countDays(startDate, endDate);
  const curAmount = filterData.amount;

  const [isPossible, setIsPossible] = useState(false);

  let totalPrice = 0;
  if (curAmount < baseHeadCount) {
    totalPrice = price * countDay;
  } else if (curAmount > maxHeadCount) {
    totalPrice = price * countDay + 15000 * (maxHeadCount - baseHeadCount);
  } else {
    totalPrice = price * countDay + 15000 * (curAmount - baseHeadCount);
  }

  useEffect(() => {
    if (curAmount < baseHeadCount) {
      totalPrice = price;
      setIsPossible(false);
      return;
    } else if (curAmount > maxHeadCount) {
      totalPrice = price + 15000 * (maxHeadCount - baseHeadCount);
      setIsPossible(false);
      return;
    } else {
      totalPrice = price + 15000 * (curAmount - baseHeadCount);
      setIsPossible(true);
      return;
    }
  }, [window.location.search, isClicked]);

  const { showToast, ToastContainer } = ToastLayout();

  const template: Template = {
    cityView: "시티뷰",
    oceanView: "오션뷰",
    petAccompanying: "반려견 동반",
    canSmoking: "흡연 가능",
    hasNetflix: "넷플릭스",
    has_pc: "PC",
    canCooking: "취사 가능",
  };

  const onClickOrder = async () => {
    if (!userData) {
      showToast({
        theme: "error",
        message: "로그인을 해주세요",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1700);
      return;
    }

    await setOrderData([
      {
        accommodationName: accommodationName,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        headCount: filterData.amount,
        maxHeadCount: maxHeadCount,
        price: totalPrice,
        roomId: roomId,
        roomName: name,
        startDate: startDate,
        endDate: endDate,
      },
    ]);

    await navigate("/order?cart=false");
    window.scrollTo(0, 0);
  };

  let text = "";
  if (soldOut) {
    text = "판매된 객실입니다";
  } else if (!isPossible) {
    text = "인원을 변경해주세요";
  } else {
    text = "예약불가";
  }

  return (
    <div className="room__info">
      <div>
        <div className="accommodation__menu-title">
          <span className="text-subtitle4">{name}</span>
        </div>
        <div className="accommodation__main-info__detail">
          <IoPeople size="17px" />
          <span className="text-body1">
            기준 {baseHeadCount}인 / 최대 {maxHeadCount}인
          </span>
        </div>
        <div className="room__options-container">
          {englishToKoreanFormat(roomOption, template).map((option: any) => (
            <Badge key={option} text={option} badgeStatus="dark" />
          ))}
        </div>

        <div className="room__detail-info">
          <div className="room__detail-info__time">
            <span className="text-body2">체크인 {checkInTime}</span>
            <span className="text-body2">체크아웃 {checkOutTime}</span>
          </div>

          {/* 쿠폰이 있으면 원래가격 */}
          <div className="room__detail-info__strikethrough">
            <span>75000원</span>
          </div>

          <div className="room__detail-info__price text-subtitle4">
            {/* 쿠폰이 있으면 쿠폰가 div */}
            <div className="room__detail-info__price__discountBox">
              <span>쿠폰가</span>
            </div>
            {numberFormat(totalPrice)} 원
          </div>
        </div>
      </div>

      <div>
        {/* <div className="room__divider"></div>s */}
        <div className="room__buttons-container">
          {soldOut || !isPossible ? (
            <Button
              text={text}
              buttonSize="large"
              colorName="coral400"
              isPassed={false}
            />
          ) : (
            <>
              <Button
                text="예약하기"
                buttonSize="large"
                onClick={onClickOrder}
              />
            </>
          )}
        </div>
        {ToastContainer}
      </div>
    </div>
  );
};
export default RoomInfo;
