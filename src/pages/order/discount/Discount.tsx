import { memo, useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa6";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { orderState } from "@/states/orderState";
import { discountState } from "@/states/discountState";

import "./discount.scss";
import { Coupon } from "@/types/accommodationDetail";
import { usedCouponState } from "@/states/usedCouponState";

const Discount = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const [couponList, setCouponList] = useState<Coupon[] | []>([]);
  const setDiscountAmt = useSetRecoilState(discountState);
  const order = useRecoilValue(orderState);
  const defaultOption: Coupon = { name: "선택안함", id: 0, price: 0 };
  const [usedCoupon, setUsedCoupon] = useRecoilState(usedCouponState);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCoupon = (coupon: Coupon) => {
    setUsedCoupon(coupon);
    setDiscountAmt(coupon.price || 0);
    setIsOpen(false);

    if (
      coupon.name === "선택안함" ||
      !couponList.find(item => item.name === defaultOption.name)
    ) {
      setCouponList(prevCouponList =>
        coupon.name === "선택안함"
          ? order[0]?.coupons || []
          : [defaultOption, ...prevCouponList]
      );
    }
  };

  useEffect(() => {
    if (!order) {
      return;
    }
    setCouponList(order[0].coupons);
  }, [order]);

  useEffect(() => {
    console.log("couponList", couponList);
  }, [couponList]);

  return (
    <div className="discount">
      <h4 className="text-subtitle4">할인</h4>
      <div className={`dropdown-container ${isOpen && "open"}`}>
        <div className="selected-option" onClick={toggleDropdown}>
          <span className="label">
            {usedCoupon ? usedCoupon.name : "선택안함"}
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
            {couponList.map(coupon => (
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
