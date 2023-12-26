import { memo } from "react";
import "./DiscountItem.scss";

const DiscountItem = memo(
  ({
    className,
    methodName,
    selectedMethod,
    setSelectedMethod,
  }: DiscountItemProps) => {
    const handleSelected = () => {
      setSelectedMethod(methodName);
    };

    return (
      <input
        className={`${
          className ? `discount-item ${className}` : "discount-item"
        } text-body1 ${
          selectedMethod === methodName ? "discount__selected" : ""
        }`}
        onClick={handleSelected}
        type="button"
        value={methodName}
      />
    );
  }
);

export default DiscountItem;

interface DiscountItemProps {
  className: string;
  methodName: string;
  selectedMethod: string;
  setSelectedMethod: (methodName: string) => void;
}
