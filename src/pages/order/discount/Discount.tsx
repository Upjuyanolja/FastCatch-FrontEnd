import { SetStateAction, memo, useState } from "react";

//import DiscountItem from "@/pages/discount/discountItem/DiscountItem";
import { discount } from "@/constant/discount";
import { FaSortDown } from "react-icons/fa6";
import "./discount.scss";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderState, OrderItemTypes } from "@/states/orderState";

const Discount = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<OrderItemTypes | null>(
    null
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCoupon = (option: OrderItemTypes) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const defaultOption: OrderItemTypes = { couponName: "선택없음", price: 0 };

  const order = useRecoilValue(orderState);

  return (
    <div className="discount">
      <h4 className="text-subtitle4">할인</h4>
      <div className="dropdown-container">
        <div className="selected-option" onClick={toggleDropdown}>
          <span className="label">
            {selectedCoupon ? selectedCoupon.couponName : "선택안함"}
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
              {defaultOption.couponName}
            </li>
            {order.coupons.map(coupon => (
              <li
                key={coupon.couponName}
                className="dropdown-item"
                onClick={() => selectCoupon(coupon)}
              >
                {coupon.couponName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default Discount;
