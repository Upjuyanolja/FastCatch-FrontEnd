import "./CouponModal.scss";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import { useQuery } from "react-query";

import LoadingAnimation from "@/components/loadingAnimation/LoadingAnimation";
import ErrorAnimation from "@/components/errorAnimation/ErrorAnimation";
import numberFormat from "./../../../../utils/numberFormat";
import { getCouponDataApi } from "@/api/getCouponDataApi";

interface modalPropI {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | null;
}

const CouponModal = ({ isVisible, setIsVisible, id }: modalPropI) => {
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isVisible);
    refetch();
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isVisible]);
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: [id, "couponData"],
    queryFn: () => getCouponDataApi(id),
    staleTime: 500000,
    cacheTime: 5000000,
  });

  const closeModal = () => {
    setIsVisible(false);
  };

  const closeBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
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
  return (
    <>
      {isVisible && (
        <>
          <div className="coupon-modal-bg" onClick={closeBg}></div>
          <div className="coupon-modal-wrap">
            <div className="coupon-modal-wrap__header">
              <button className="btn-close" onClick={closeModal}>
                <IoClose />
              </button>
            </div>
            <div className="coupon-modal-wrap__body">
              <p className="text-subtitle4">이 숙소 적용 가능 쿠폰</p>
              {data &&
                data.map(room => (
                  <div
                    key={`room-${room.id}`}
                    className="coupon-modal-wrap__layout"
                  >
                    {room.coupons.map(coupon => (
                      <div className="coupon-modal-wrap__body__coupon-wrap">
                        <div key={coupon.id}>
                          <div>
                            <span className="coupon-modal-wrap__body__coupon-wrap__color-coral text-subtitle3">
                              {numberFormat(
                                Number(coupon.name?.split(" ")[0].slice(0, -1))
                              ) +
                                coupon.name?.split(" ")[0].slice(-1, 100) +
                                " "}
                            </span>
                            <span className="coupon-modal-wrap__body__coupon-wrap__color-gray text-subtitle5">
                              할인쿠폰
                            </span>
                          </div>
                          <ul className="coupon-modal-wrap__body__coupon-wrap__options text-body3">
                            <li className="coupon-modal-wrap__body__coupon-wrap__color-coral">
                              숙박 예약 시
                            </li>
                            <li className="coupon-modal-wrap__body__coupon-wrap__color-gray">
                              {coupon.endDate} 까지
                            </li>
                          </ul>
                          <div className="coupon-modal-wrap__body__coupon-wrap__room">
                            <div className="coupon-modal-wrap__body__coupon-wrap__room-item">
                              {room.roomName}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
            <div className="coupon-modal-wrap__footer"></div>
          </div>
        </>
      )}
    </>
  );
};

export default CouponModal;
