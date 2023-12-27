import { SetStateAction, memo, useState } from "react";

//import DiscountItem from "@/pages/discount/discountItem/DiscountItem";
import { discount } from "@/constant/discount";

import "./discount.scss";

type OptionType = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  options: OptionType[];
};

const Discount = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: OptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="discount">
      <h4 className="text-subtitle4">할인</h4>
      <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleDropdown}>
          {selectedOption ? selectedOption.label : "Select an option"}
          <span className={`arrow ${isOpen ? "open" : ""}`}></span>
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            {discount.map((option, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => selectOption(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* {discount.map((option, index) => (
          <DiscountItem
            className={""}
            methodName={option}
            key={index}
            selectedDiscount={selectedDiscount}
            setSelectedDiscount={setSelectedDiscount}
          />
        ))} */}
    </div>
  );
});

export default Discount;

interface DiscountProps {
  selectedDiscount: string; //차후에 수정하기
  setSelectedDiscount: React.Dispatch<SetStateAction<string>>;
}
