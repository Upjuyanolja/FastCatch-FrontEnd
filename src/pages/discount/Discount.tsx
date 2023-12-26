import { SetStateAction, memo } from "react";

import DiscountItem from "@/pages/order/paymentMethodItem/PaymentMethodItem";
import { initialPaymentMethod } from "@/constant/initialPaymentMethod";

import "./paymentMethod.scss";

var myList = ["1번", "2번", "3번"]; //예시; 스타일링 확인 후 삭제 예정

const Discount = memo(
  ({ selectedCoupon, setSelectedCoupon }: DiscountProps) => {
    return (
      <div className="payment-method">
        <h4 className="text-subtitle4">할인</h4>
        {initialPaymentMethod.map((option, index) => (
          <DiscountItem
            className={""}
            methodName={option}
            key={index}
            selectedMethod={selectedCoupon}
            setSelectedMethod={setSelectedCoupon}
          />
        ))}
      </div>
    );
  }
);

export default Discount;

interface DiscountProps {
  selectedCoupon: string; //차후에 수정하기
  setSelectedCoupon: React.Dispatch<SetStateAction<string>>;
}
