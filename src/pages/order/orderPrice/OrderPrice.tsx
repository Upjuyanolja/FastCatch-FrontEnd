import numberFormat from "@/utils/numberFormat";
import "./orderPrice.scss";
import { useRecoilState } from "recoil";
import { discountState } from "@/states/discountState";

const OrderPrice = ({ nightCount, roomPrice }: OrderPriceProps) => {
  const [discountAmt, setDiscountAmt] = useRecoilState(discountState);
  console.log(roomPrice, discountAmt);
  const finalPrice = discountAmt > 0 ? discountAmt : roomPrice;

  // Format the prices for display
  const formattedOriginalPrice = numberFormat(roomPrice + discountAmt);
  const formattedFinalPrice = numberFormat(finalPrice);

  return (
    <div className="order-price">
      <span className="order-price__night-count text-body1">
        ({nightCount}박)
      </span>
      {discountAmt !== 0 && (
        <div className="coupon-box">
          <div className="coupon-label">쿠폰가</div>
        </div>
      )}

      <div className="original-price-container">
        {discountAmt !== 0 && (
          <span className="original-price">{formattedOriginalPrice}</span>
        )}
        <span className="order-price__price text-subtitle3">
          {formattedFinalPrice}원
        </span>
      </div>
    </div>
  );
};

export default OrderPrice;

interface OrderPriceProps {
  nightCount: number;
  roomPrice: number;
}
