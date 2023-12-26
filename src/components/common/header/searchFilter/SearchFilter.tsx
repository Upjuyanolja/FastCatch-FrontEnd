import { useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import "./searchFilter.scss";
import { searchAccommodationByName } from "@/hooks/fetchAccommodations";
import { useRecoilState } from "recoil";
import { detailState } from "@/states/detailState";
import { Accommodation } from "@/states/detailState";
import { useNavigate } from "react-router-dom";

const SearchFilter = () => {
  const navigate = useNavigate();
  const [detailStates, setDetailStates] = useRecoilState(detailState);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (detailStates.length === 0) {
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [detailStates]);
  const searchSubmitHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const name = inputRef.current?.value;
    if (name?.trim().length === 0) {
      window.alert("검색어를 입력해주세요.");
      return;
    }

    navigate("/");
    searchAccommodationByName(name!)
      .then(res => {
        if (res.accommodations.length) {
          return res.accommodations;
        } else {
          alert("해당하는 조건의 숙소가 없습니다.");
          throw new Error("해당하는 조건의 숙소가 없습니다.");
        }
      })
      .then((res: Accommodation[]) => setDetailStates(res));
  };

  return (
    <form onSubmit={searchSubmitHandler} style={{ position: "relative" }}>
      <input
        type="text" //
        minLength={2}
        maxLength={15}
        autoFocus
        placeholder="원하시는 지역, 숙소를 검색해보세요!"
        className="search-filter__input text-body2"
        ref={inputRef}
      />
      <button type="submit" className="filter__primary-button in-search">
        <IoIosSearch className="search-button__icon" />
      </button>
    </form>
  );
};

export default SearchFilter;
