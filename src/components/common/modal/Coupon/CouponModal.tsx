// import { Button } from "..";
import "./CouponModal.scss";
import { IoClose } from "react-icons/io5";

// type Size = "small" | "large";

// interface buttonInfo {
//   text: string;
//   size?: string;
//   colorName?: string;
//   onClick: () => void;
// }

interface modalPropI {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CouponModal = ({ isVisible, setIsVisible }: modalPropI) => {
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

              <div className="coupon-modal-wrap__body__coupon-wrap">
                <div>
                  <div>
                    <span className="text-subtitle3">10,000원 </span>
                    <span className="text-subtitle5">할인쿠폰</span>
                  </div>
                  <ul className="coupon-modal-wrap__body__coupon-wrap__options text-body3">
                    <li>숙박 예약 시</li>
                    <li>옵션 2</li>
                  </ul>
                  <div className="coupon-modal-wrap__body__coupon-wrap__room">
                    <div className="coupon-modal-wrap__body__coupon-wrap__room-item">
                      스탠다드룸
                    </div>
                    <div className="coupon-modal-wrap__body__coupon-wrap__room-item">
                      디럭스룸
                    </div>
                  </div>
                </div>
              </div>
              <div className="coupon-modal-wrap__body__coupon-wrap">
                <div>
                  <div>
                    <span className="text-subtitle3">10,000원 </span>
                    <span className="text-subtitle5">할인쿠폰</span>
                  </div>
                  <ul className="coupon-modal-wrap__body__coupon-wrap__options text-body3">
                    <li>숙박 예약 시</li>
                    <li>옵션 2</li>
                    <li>옵션 3</li>
                  </ul>
                  <div className="coupon-modal-wrap__body__coupon-wrap__room">
                    <div className="coupon-modal-wrap__body__coupon-wrap__room-item">
                      스탠다드룸
                    </div>
                    <div className="coupon-modal-wrap__body__coupon-wrap__room-item">
                      디럭스룸
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="coupon-modal-wrap__footer"></div>
          </div>
        </>
      )}
    </>
  );
};

export default CouponModal;
