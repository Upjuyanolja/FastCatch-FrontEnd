import { useRecoilValue } from "recoil";
import { format } from "date-fns";
import "./accommodation.scss";
import { useQuery } from "react-query";
import RoomSelect from "./roomSelect/RoomSelect";
import AccommodationMainInfo from "./accommodationMainInfo/AccommodationMainInfo";
import AccommodationOptions from "./accommodationOptions/AccommodationOptions";
import { filterState } from "@/states/filterState";
import LoadingAnimation from "@/components/loadingAnimation/LoadingAnimation";
import ErrorAnimation from "@/components/errorAnimation/ErrorAnimation";
import { AiOutlineRight } from "react-icons/ai";
import CouponModal from "@/components/common/modal/Coupon/CouponModal";
import { useState } from "react";
import { getAccommodationDetailApi } from "@/api/getAccommodationDetailApi";
import AccommodationSwiper from "./accommodationSwiper/index";

const Accommodation = () => {
  const filterData = useRecoilValue(filterState);
  const startDate = format(filterData.current.startDate, "yyyy-MM-dd");
  const endDate = filterData.endDate
    ? format(filterData.endDate, "yyyy-MM-dd")
    : format(filterData.startDate, "yyyy-MM-dd");

  const [isVisible, setIsVisible] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const getAccommodationDetailData = async () => {
    const result = await getAccommodationDetailApi(id, startDate, endDate);
    return result;
  };

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: [id, "postDetail"],
    queryFn: getAccommodationDetailData,
  });

  if (isLoading) {
    return (
      <div className="accommodation__animation-container">
        <LoadingAnimation width="200px" height="200px" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="home__animation-container">
        <ErrorAnimation width="200px" height="200px" />
        <p>에러가 발생하였습니다. 다시 시도해주세요!</p>
      </div>
    );
  }

  const handleClickCouponBox = () => {
    setIsVisible(true);
  };

  return (
    <>
      <div className="accommodation-container">
        {isVisible && (
          <CouponModal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            id={id}
          />
        )}
        <div>
          <AccommodationSwiper roomImg={data.images}></AccommodationSwiper>
        </div>

        <AccommodationMainInfo
          accommodationName={data.name}
          accommodationLocation={data.address}
          accommodationPhone={data.phoneNumber}
          accommodationCategory={data.category}
        />
        {/* 메인 쿠폰이 있을 시 보여지는 창*/}
        {data.mainCoupon && (
          <div className="accommodation__coupon-wrapper">
            <button
              className="accommodation__coupon-wrapper__coupon-modal-btn"
              onClick={handleClickCouponBox}
            >
              <div>{data.mainCoupon}</div>
              <div className="accommodation__coupon-wrapper__coupon-modal-btn__right-menu">
                <div>더보기</div>
                <div>
                  <AiOutlineRight size={24} />
                </div>
              </div>
            </button>
          </div>
        )}
        <div className="accommodation__divider"></div>
        <div className="accommodation__introduce">
          <div className="accommodation__menu-title">
            <span className="text-subtitle4">숙소 소개</span>
          </div>
          <div>
            <span className="text-body1">{data.description}</span>
          </div>
        </div>
        <div className="accommodation__divider"></div>
        <AccommodationOptions options={data?.option} />
        <div className="accommodation__divider"></div>
        <RoomSelect
          roomsInfo={data?.rooms}
          accommodationId={data?.id}
          accommodationName={data?.name}
          refetch={refetch}
        />
      </div>
    </>
  );
};

export default Accommodation;
