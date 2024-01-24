import { SetStateAction, memo } from "react";

import PaymentMethodItem from "@/pages/order/paymentMethodItem/PaymentMethodItem";
import { initialPaymentMethod } from "@/constant/initialPaymentMethod";

import "./paymentMethod.scss";

const PaymentMethod = memo(
  ({ selectedMethod, setSelectedMethod }: PaymentMethodProps) => {
    return (
      <div className="payment-method">
        <h4 className="text-subtitle4">결제 수단</h4>
        {initialPaymentMethod.map((item, index) => (
          <PaymentMethodItem
            className={index === 0 ? "full" : ""}
            label={item.label}
            payMethod={item.payMethod}
            key={index}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
        ))}
      </div>
    );
  }
);

export default PaymentMethod;

interface PaymentMethodProps {
  selectedMethod: SelectedMethod;
  setSelectedMethod: React.Dispatch<SetStateAction<SelectedMethod>>;
}

export interface SelectedMethod {
  label: string;
  payMethod: string;
}
