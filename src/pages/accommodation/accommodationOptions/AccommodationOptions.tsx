import "./accommodationOptions.scss";
import englishToKoreanFormat from "../../../utils/englishToKoreanFormat";
import { PiCookingPotBold } from "react-icons/pi";
import { IAccommodationOptionsType } from "@/types/accommodationDetail";

import { GiBarbecue } from "react-icons/gi";
import { IoBarbell } from "react-icons/io5";
import { FaMusic, FaTruckPickup } from "react-icons/fa";
import {
  MdLocalParking,
  MdMeetingRoom,
  MdOutlineSportsSoccer,
  MdBathroom,
} from "react-icons/md";

interface TemplateItem {
  [key: string]: [string, JSX.Element];
}

const AccommodationOptions = ({
  options,
}: {
  options: IAccommodationOptionsType;
}) => {
  const template: TemplateItem = {
    barbecue: ["바베큐 가능", <GiBarbecue size="50px" />],
    cooking: ["취사 가능", <PiCookingPotBold size="50px" />],
    fitness: ["헬스 가능", <IoBarbell size="50px" />],
    karaoke: ["노래방", <FaMusic size="50px" />],
    parking: ["주차장", <MdLocalParking size="50px" />],
    pickup: ["픽업", <FaTruckPickup size="50px" />],
    sauna: ["사우나", <MdBathroom size="50px" />],
    seminar: ["세미나", <MdMeetingRoom size="50px" />],
    sports: ["스포츠", <MdOutlineSportsSoccer size="50px" />],
  };

  return (
    <div className="accommodation__options">
      <div className="accommodation__menu-title">
        <span className="text-subtitle4">숙소 옵션</span>
      </div>
      <div className="accommodation__options-box">
        <div className="accommodation__options-box__grid">
          {englishToKoreanFormat(options, template).map((option: any) => (
            <div className="accommodation__option" key={option}>
              {option[1]}
              <span>{option[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccommodationOptions;
