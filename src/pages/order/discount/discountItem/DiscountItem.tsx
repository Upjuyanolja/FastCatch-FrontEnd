/*import { memo } from "react";
import "./DiscountItem.scss";

const DiscountItem = memo(
  ({
    className,
    methodName,
    selectedDiscount,
    setSelectedDiscount,
  }: DiscountItemProps) => {
    const handleSelected = () => {
        setSelectedDiscount(methodName);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectOption = (option: OptionType) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        
    //   <input
    //     className={`${
    //       className ? `discount-item ${className}` : "discount-item"
    //     } text-body1 ${
    //     selectedDiscount === methodName ? "discount__selected" : ""
    //     }`}
    //     onClick={handleSelected}
    //     type="button"
    //     value={methodName}
    //   />
    );
  }
);

export default DiscountItem;

interface DiscountItemProps {
  className: string;
  methodName: string;
  selectedMethod: string;
  setSelectedMethod: (methodName: string) => void;
}*/
