import { useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import "./searchFilter.scss";

import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchState } from "@/states/searchState";
import { categoryState, hasCouponState } from "@/states/categoryState";

const SearchFilter = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [keyword, setKeyword] = useRecoilState(searchState);
  const setCategory = useSetRecoilState(categoryState);
  const setHasCoupon = useSetRecoilState(hasCouponState);

  const searchSubmitHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const name = inputRef.current?.value;
    if (name?.trim().length === 0 || !name) {
      window.alert("검색어를 입력해주세요.");
      return;
    }

    navigate("/");
    setKeyword(name);
    setCategory("ALL");
    setHasCoupon(false);
  };

  useEffect(() => {
    if (keyword === "" && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [keyword]);

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
