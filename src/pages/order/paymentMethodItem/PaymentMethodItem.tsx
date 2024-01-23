import { SetStateAction, memo } from "react";
import "./paymentMethodItem.scss";
import { SelectedMethod } from "../paymentMethod/PaymentMethod";

const PaymentMethodItem = memo(
  ({
    className,
    label,
    selectedMethod,
    setSelectedMethod,
    payMethod,
  }: PaymentMethodItemProps) => {
    const handleSelected = () => {
      setSelectedMethod({
        label,
        payMethod,
      });
    };

    return (
      <input
        className={`${
          className ? `payment-method-item ${className}` : "payment-method-item"
        } text-body1 ${
          selectedMethod.label === label ? "payment-method-item__selected" : ""
        }`}
        onClick={handleSelected}
        type="button"
        value={label}
      />
    );
  }
);

export default PaymentMethodItem;

interface PaymentMethodItemProps {
  className: string;
  label: string;
  payMethod: string;
  selectedMethod: SelectedMethod;
  setSelectedMethod: React.Dispatch<SetStateAction<SelectedMethod>>;
}
