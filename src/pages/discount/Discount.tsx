import { SetStateAction, memo, useState } from "react";

//import DiscountItem from "@/pages/discount/discountItem/DiscountItem";
import { discount } from "@/constant/discount";
import { FaSortDown } from "react-icons/fa6";
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

  const defaultOption: OptionType = { label: "선택없음", value: "" };

  return (
    <div className="discount">
      <h4 className="text-subtitle4">할인</h4>
      <div className="dropdown-container">
        <div className="selected-option" onClick={toggleDropdown}>
          <span className="label">
            {selectedOption ? selectedOption.label : "선택안함"}
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
              onClick={() => selectOption(defaultOption)}
            >
              {defaultOption.label}
            </li>
            {discount.map(option => (
              <li
                key={option.value}
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
