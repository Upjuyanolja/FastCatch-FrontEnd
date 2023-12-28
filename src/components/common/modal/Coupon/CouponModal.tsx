import axios from "axios";
import "./CouponModal.scss";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

interface modalPropI {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Rooms {
  roomName: string;
}

interface CouponData {
  maxDiscount: number;
  couponName: string;
  endDate: string;
  rooms: Rooms[];
}

const CouponModal = ({ isVisible, setIsVisible }: modalPropI) => {
  const [coupons, setCoupons] = useState<CouponData[]>([]);

  useEffect(() => {
    const fetchCouponData = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/coupons`
      );
      setCoupons(result.data.data.coupons);
    };

    if (isVisible) {
      fetchCouponData();
    }
  }, [isVisible]);

  const closeModal = () => {
    setIsVisible(false);
  };

  const closeBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

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
              {coupons.length > 0 &&
                coupons.map((coupon, index) => (
                  <div
                    key={index}
                    className="coupon-modal-wrap__body__coupon-wrap"
                  >
                    <div>
                      <div>
                        <span className="text-subtitle3">
                          {coupon.couponName.split(" ")[0] + " "}
                        </span>
                        <span className="text-subtitle5">
                          {coupon.couponName.split(" ")[1]}
                          {coupon.couponName.split(" ")[2]}
                        </span>
                      </div>
                      <ul className="coupon-modal-wrap__body__coupon-wrap__options text-body3">
                        <li>숙박 예약 시</li>
                        <li>{coupon.endDate.slice(2)} 까지</li>
                      </ul>
                      <div className="coupon-modal-wrap__body__coupon-wrap__room">
                        {coupon.rooms.map((room, roomIndex) => (
                          <div
                            key={roomIndex}
                            className="coupon-modal-wrap__body__coupon-wrap__room-item"
                          >
                            {room.roomName}
                          </div>
                        ))}
                      </div>
                    </div>
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
