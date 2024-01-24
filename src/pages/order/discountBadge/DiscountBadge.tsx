import React from "react";
import "./discountBadge.scss";
import numberFormat from "@/utils/numberFormat";

interface DiscountBadgeProps {
  savedAmt: number;
}

const DiscountBadge = ({ savedAmt }: DiscountBadgeProps) => {
  return (
    <>
      <div className="discount-badge-container">
        <div className="discount-badge">
          <p>총 {numberFormat(savedAmt)}원 할인 받았어요!</p>
        </div>
      </div>
    </>
  );
};

export default DiscountBadge;
