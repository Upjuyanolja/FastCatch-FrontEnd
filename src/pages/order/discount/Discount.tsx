import { SetStateAction, memo, useState } from "react";

//import DiscountItem from "@/pages/discount/discountItem/DiscountItem";
//import { discount } from "@/constant/discount";
import { FaSortDown } from "react-icons/fa6";
import "./discount.scss";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderState, OrderItemTypes } from "@/states/orderState";

const Discount = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedCoupon, setSelectedCoupon] = useState<OrderItemTypes | null>(
  //   null
  // );

  type CouponType = {
    id: number;
    name: string;
    price: number;
  };

  const [selectedMock, setSelectedMock] = useState<CouponType | null>(null);

  const mockData = [
    {
      accommodationName: "해뜨는집 펜션",
      checkInTime: "15:00",
      checkOutTime: "12:00",
      defaultCapacity: 4,
      maxCapacity: 6,
      price: 100000,
      discountPrice: 80000,
      id: 286,
      roomName: "봄",
      startDate: "2023-12-29",
      endDate: "2023-12-29",
      coupons: [
        { id: 56, name: "10% 할인", price: 90000 },
        { id: 57, name: "2000원 할인", price: 80000 },
      ],
    },
  ];
  const [data, setData] = useState(mockData);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // const selectCoupon = (coupon: OrderItemTypes) => {
  //   setSelectedCoupon(coupon);
  //   setIsOpen(false);
  // };

  const selectMock = (coupon: CouponType) => {
    setSelectedMock(coupon);
    setIsOpen(false);
  };

  const defaultOption: CouponType = { name: "선택없음", id: 0, price: 0 };

  const order = useRecoilValue(orderState);

  return (
    <div className="discount">
      <h4 className="text-subtitle4">할인</h4>
      <div className="dropdown-container">
        <div className="selected-option" onClick={toggleDropdown}>
          <span className="label">
            {/* {selectedCoupon ? selectedCoupon.name : "선택안함"} */}
            {selectedMock ? selectedMock.name : "선택안함"}
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
              // onClick={() => selectCoupon(defaultOption)}
              onClick={() => selectMock(defaultOption)}
            >
              {defaultOption.name}
            </li>
            {mockData[0]?.coupons.map(coupon => (
              <li
                key={coupon.id}
                className="dropdown-item"
                // onClick={() => selectCoupon(coupon)}
                onClick={() => selectMock(coupon)}
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
