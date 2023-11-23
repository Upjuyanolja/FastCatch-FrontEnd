import React from "react";
import CommonButton from "@/src/components/commonButton/CommonButton";
import numberFormat from "@/src/utils/numberFormat";
import { IoCartOutline, IoPeople } from "react-icons/io5";
import CommonBadge from "@/src/components/commonBadge/CommonBadge";
import transformOptions from "@/src/utils/englishToKoreanFormat";

const RoomInfo = ({ room }: any) => {
  const { roomName, price, roomOptions } = room;

  const template: any = {
    cityView: "시티뷰", //city_view로 수정
    oceanView: "오션뷰", //ocean_view
    pet: "반려견 동반", //pet_accompanying
    smoking: "흡연 가능", //can_smoking
    has_tub: "욕조",
    has_netflix: "넷플릭스",
    has_pc: "PC",
    has_amenity: "어메니티",
    can_cooking: "취사 가능",
  };

  return (
    <div className="room__info">
      <div>
        <div className="accommodation__menu-title">
          <span className="text-subtitle4">{roomName}</span>
        </div>

        <div className="accommodation__main-info__detail">
          <IoPeople size="17px" />
          <span className="text-body1"> 기준2인 / 최대2인</span>
        </div>

        <div className="room__options-container">
          {transformOptions(roomOptions, template).map((option: string) => (
            <CommonBadge text={option} badgeType="line" />
          ))}
        </div>

        <div className="room__detail-info">
          <div className="room__detail-info__time">
            <span className="text-body2">체크인 09:00</span>
            <span className="text-body2">체크아웃 15:00</span>
          </div>
          <div className="text-subtitle4">{numberFormat(price)} 원</div>
        </div>
      </div>

      <div>
        <div className="room__divider"></div>
        <div className="room__buttons-container">
          <button className="room__buttons-container__basket">
            <IoCartOutline size="30px" color="#93114E" />
          </button>
          <CommonButton text="예약하기" buttonSize="large" />
        </div>
      </div>
    </div>
  );
};
export default RoomInfo;
