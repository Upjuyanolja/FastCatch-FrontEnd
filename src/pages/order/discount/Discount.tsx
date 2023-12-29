import { memo, useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa6";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderState } from "@/states/orderState";
import { discountState } from "@/states/discountState";
import "./discount.scss";

const Discount = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  type CouponType = {
    id: number;
    name: string;
    price: number;
  };

  const [couponList, setCouponList] = useState<CouponType[] | []>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);
  const setDiscountAmt = useSetRecoilState(discountState);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCoupon = (coupon: CouponType) => {
    setSelectedCoupon(coupon);
    setDiscountAmt(coupon.price);
    setIsOpen(false);

    if (
      coupon.name === "선택안함" ||
      !couponList.find(item => item.name === defaultOption.name)
    ) {
      setCouponList(
        coupon.name === "선택안함"
          ? order[0]?.coupons || []
          : [defaultOption, ...couponList]
      );
    }
  };

  const defaultOption: CouponType = { name: "선택안함", id: 0, price: 0 };

  const order = useRecoilValue(orderState);

  useEffect(() => {
    if (!order) {
      return;
    }
    setCouponList(order[0].coupons);
  }, [order]);

  return (
    <div className="discount">
      <h4 className="text-subtitle4">할인</h4>
      <div className={`dropdown-container ${isOpen && "open"}`}>
        <div className="selected-option" onClick={toggleDropdown}>
          <span className="label">
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
