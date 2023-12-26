import { useState } from "react";
import "./categoryFilter.scss";
import _debounce from "lodash/debounce";

// 이미지들
import ALL from "../../../../assets/categoryIcons/all.jpg";
import PENSION from "../../../../assets/categoryIcons/pension-fullvilla.jpg";
import GUESTHOUSE from "../../../../assets/categoryIcons/guest-house.jpg";
import HOTELRESORT from "../../../../assets/categoryIcons/hotel.jpg";
import MOTEL from "../../../../assets/categoryIcons/motel.jpg";

import { useSetRecoilState } from "recoil";

// 다른 컴포넌트
import { filterState, filterStateTypes } from "@/states/filterState";
import { AccommodationType } from "@/types/accommodations";
import { responseState } from "@/states/responseState";
import { detailState } from "@/states/detailState";

interface categoryTypes {
  name: string;
  img: string;
  select: boolean;
  engName: string;
}

const CategoryFilter = () => {
  const setFilterStates = useSetRecoilState(filterState);
  const setResponseStates = useSetRecoilState(responseState);
  const setDetailStates = useSetRecoilState(detailState);

  const categoriesData: //
  categoryTypes[] = [
    { name: "전체", img: ALL, engName: "ALL", select: true },
    {
      name: "호텔/리조트",
      img: PENSION,
      engName: "HOTELRESORT",
      select: false,
    },
    { name: "모텔", img: GUESTHOUSE, engName: "MOTEL", select: false },
    {
      name: "팬션/풀빌라",
      img: HOTELRESORT,
      engName: "PENSION",
      select: false,
    },
    { name: "게스트하우스", img: MOTEL, engName: "GUESTHOUSE", select: false },
  ];

  const [categories, setCategories] = useState(categoriesData);

  const changeCategoryHandler = (categoryName: string) => {
    // 카테고리 데이터가 바뀔때마다 서버호출을 다시합니다....
    let engName = "";
    const copy: categoryTypes[] = categories.slice().map(arg => {
      if (arg.name === categoryName) {
        engName = arg.engName;
        return { ...arg, select: true };
      }
      return { ...arg, select: false };
    });
    setCategories(copy);
    setResponseStates({
      pageIndex: 0,
      responseArray: [],
    });
    setDetailStates([]);

    setFilterStates((prev: filterStateTypes) => ({
      ...prev,
      current: {
        ...prev.current,
        category: engName as AccommodationType,
      },
    }));
  };

  return (
    <div className="category-filter__container">
      <div className="category-filter__inner">
        {categories.map((category, idx) =>
          category.select === true ? ( //
            <button //
              key={`category-filter-${idx}`}
              className="filter__button categorySelect"
              onClick={_debounce(() => {
                setDetailStates([]);
                changeCategoryHandler(category.name);
              }, 100)}
            >
              <img src={category.img}></img>
              <span>{category.name}</span>
            </button>
          ) : (
            <button //
              key={idx}
              className="filter__button"
              onClick={_debounce(() => {
                setDetailStates([]);
                changeCategoryHandler(category.name);
              }, 100)}
            >
              <img src={category.img}></img>
              <span>{category.name}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
