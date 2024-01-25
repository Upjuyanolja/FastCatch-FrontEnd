import { useEffect, useState } from "react";
import _debounce from "lodash/debounce";
import "./roomSelect.scss";
import RoomInfo from "./roomInfo/RoomInfo";
import { useRecoilState } from "recoil";
import { filterState } from "@/states/filterState";
import { IRoom } from "@/types/accommodationDetail";
import { Filter } from "@/components/common";
import RoomImgSwiper from "./roomImgSwiper/RoomImgSwiper";

interface RoomSelectProps {
  accommodationId: number;
  accommodationName: string;
  roomsInfo: Array<IRoom>;
  refetch: any;
}

const RoomSelect = ({
  accommodationId,
  accommodationName,
  roomsInfo,
  refetch,
}: RoomSelectProps) => {
  const [isClicked, setIsClicked] = useState(true);
  const [filterData, setFilterData] = useRecoilState(filterState);
  useEffect(() => {
    refetch();
  }, [isClicked]);

  const handleClick = _debounce(async () => {
    // 검색 클릭 여부 판단용 -> 각 room에서 예약 가능 여부 useEffect의 의존성 배열로 사용
    setIsClicked(!isClicked);

    // 전역 데이터 업데이트
    setFilterData(prevStates => {
      return {
        ...prevStates,
        current: {
          ...prevStates.current,
          startDate: filterData.startDate,
          endDate: filterData.endDate,
          amount: filterData.amount,
        },
      };
    });
  }, 0);

  return (
    <div className="accommodation__select-room">
      <div className="accommodation__menu-title">
        <span className="text-subtitle4">객실 선택</span>
      </div>

      <div className="small-filter__container">
        <Filter onClick={handleClick} />
      </div>

      <div className="room-container">
        {roomsInfo.map((room: any, idx) => (
          <div className="room-container__list" key={idx}>
            <div className="room__imgs">
              <RoomImgSwiper roomImg={room.images} coupons={room.coupons} />
            </div>
            <RoomInfo
              room={room}
              accommodationId={accommodationId}
              accommodationName={accommodationName}
              isClicked={isClicked}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSelect;
