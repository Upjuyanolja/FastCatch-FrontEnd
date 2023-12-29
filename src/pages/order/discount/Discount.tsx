import { memo, useState } from "react";
import { FaSortDown } from "react-icons/fa6";
import "./discount.scss";
import { useRecoilValue, useRecoilState } from "recoil";
import { orderState } from "@/states/orderState";
import { discountState } from "@/states/discountState";

const Discount = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  type CouponType = {
    id: number;
    name: string;
    price: number;
  };

  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);
  const [discountAmt, setDiscountAmt] = useRecoilState(discountState);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCoupon = (coupon: CouponType) => {
    setSelectedCoupon(coupon);
    setDiscountAmt(coupon.price);
    setIsOpen(false);
  };

  const defaultOption: CouponType = { name: "선택안함", id: 0, price: 0 };

  const order = useRecoilValue(orderState);

  return (
    <div className="discount">
      <h4 className="text-subtitle4">할인</h4>
      <div className={`dropdown-container ${isOpen && "open"}`}>
        <div className="selected-option" onClick={toggleDropdown}>
          <span className="label">
            {/* {selectedCoupon ? selectedCoupon.name : "선택안함"} */}
            {selectedCoupon ? selectedCoupon.name : "선택안함"}
          </span>
          <span
            className={`arrow ${isOpen ? "open" : ""}`}
            onClick={toggleDropdown}
          >
            <FaSortDown />
          </span>
        </div>

        {isOpen && (
          <ul className="dropdown-list">
            <li
              key="default-option"
              className="dropdown-item"
              onClick={() => selectCoupon(defaultOption)}
            >
              {defaultOption.name}
            </li>

            {order[0]?.coupons.map(coupon => (
              <li
                key={coupon.id}
                className="dropdown-item"
                onClick={() => selectCoupon(coupon)}
              >
                {coupon.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default Discount;
