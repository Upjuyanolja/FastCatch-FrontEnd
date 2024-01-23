import { filterState } from "@/states/filterState";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";

import { useSetRecoilState } from "recoil";

import "./react-datepicker.scss";
import "./dropdown.scss";
import { useState } from "react";

interface dropdownProps {
  isSelected: "location" | "date" | "amount" | null;
  startDate: Date;
  endDate: Date | null;
}

const DateDropdown = (props: dropdownProps) => {
  const setFilterStates = useSetRecoilState(filterState);
  const [maxDate, setMaxDate] = useState<Date | null>(null);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setFilterStates(prevStates => ({
      ...prevStates,
      startDate: start as Date,
      endDate: end,
    }));

    if (start) {
      const newMaxDate = new Date(start);
      newMaxDate.setDate(newMaxDate.getDate() + 30);
      setMaxDate(newMaxDate);
    } else {
      setMaxDate(null);
    }
  };

  return (
    <>
      {props.isSelected === "date" && ( //
        <div className="date-container">
          <DatePicker //
            selected={props.startDate}
            onChange={onChange}
            minDate={new Date()}
            maxDate={maxDate ? maxDate : undefined}
            startDate={props.startDate}
            endDate={props.endDate}
            selectsRange
            inline
            showDisabledMonthNavigation
            locale={ko}
          />
        </div>
      )}
    </>
  );
};

export default DateDropdown;
