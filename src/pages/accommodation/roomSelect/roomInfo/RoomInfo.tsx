import instance from "@/api/instanceApi";
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
import { IoCartOutline, IoPeople } from "react-icons/io5";
import { useMutation } from "react-query";
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
    options,
    id,
    defaultCapacity,
    maxCapacity,
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
  if (curAmount < defaultCapacity) {
    totalPrice = price * countDay;
  } else if (curAmount > maxCapacity) {
    totalPrice = price * countDay + 15000 * (maxCapacity - defaultCapacity);
  } else {
    totalPrice = price * countDay + 15000 * (curAmount - defaultCapacity);
  }

  useEffect(() => {
    if (curAmount < defaultCapacity) {
      totalPrice = price;
      setIsPossible(false);
      return;
    } else if (curAmount > maxCapacity) {
      totalPrice = price + 15000 * (maxCapacity - defaultCapacity);
      setIsPossible(false);
      return;
    } else {
      totalPrice = price + 15000 * (curAmount - defaultCapacity);
      setIsPossible(true);
      return;
    }
  }, [window.location.search, isClicked]);

  const postBasket: any = () => {
    try {
      if (!userData) {
        return;
      }

      const response = instance.post(`/api/carts?memberId=${userData.id}`, {
        id: id,
        startDate: startDate,
        endDate: endDate,
        headCount: curAmount,
        orderPrice: totalPrice,
      });
      return response;
    } catch (error) {
      console.log("에러에러에러엘에러엘", error);
    }
  };

  const mutation = useMutation({
    mutationFn: postBasket,
    onSuccess: data => {
      console.log("데이터 전송 성공", data);
      showToast({
        theme: "success",
        message: "장바구니에 객실이 담겼습니다",
      });
    },
    onError: error => {
      console.log("전송 실패했습니다!!", error);
    },
  });

  const { showToast, ToastContainer } = ToastLayout();

  const template: Template = {
    cityView: "시티뷰",
    oceanView: "오션뷰",
    petAccompanying: "반려견 동반",
    canSmoking: "흡연 가능",
    hasNetflix: "넷플릭스",
    has_pc: "PC",
    canCooking: "취사 가능",
    internet: "인터넷",
    tv: "TV",
    airCondition: "에어컨",
  };

  const onClickBasket = _debounce(() => {
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
    mutation.mutate();
  }, 700);

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
        defaultCapacity: filterData.amount,
        maxCapacity: maxCapacity,
        price: totalPrice,
        id: id,
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
            기준 {defaultCapacity}인 / 최대 {maxCapacity}인
          </span>
        </div>
        <div className="room__options-container">
          {englishToKoreanFormat(options, template).map((option: any) => (
            <Badge key={option} text={option} badgeStatus="dark" />
          ))}
        </div>

        <div className="room__detail-info">
          <div className="room__detail-info__time">
            <span className="text-body2">체크인 {checkInTime}</span>
            <span className="text-body2">체크아웃 {checkOutTime}</span>
          </div>
          <div className="text-subtitle4">{numberFormat(totalPrice)} 원</div>
        </div>
      </div>

      <div>
        <div className="room__divider"></div>
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
              <button
                className="room__buttons-container__basket"
                onClick={onClickBasket}
              >
                <IoCartOutline size="30px" color="#93114E" />
              </button>
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
