import { useQuery } from "react-query";
import AccomodationItem from "./accomodationItem/AccomodationItem";
import LoadingAnimation from "@/components/loadingAnimation/LoadingAnimation";
import "./home.scss";

import { useRecoilState, useRecoilValue } from "recoil";
import { filterState } from "@/states/filterState";
import { format } from "date-fns";
import { fetchAccommodationsData } from "@/hooks/fetchAccommodations";
import { Accommodation } from "../../types/accommodations";
import { responseState } from "@/states/responseState";
import { useEffect, useRef } from "react";
import { detailState } from "@/states/detailState";
import ErrorAnimation from "@/components/errorAnimation/ErrorAnimation";

const Home = () => {
  const detailFiltered = useRecoilValue(detailState);
  const [filterStates] = useRecoilState(filterState);
  const [responseStates, setResponseStates] = useRecoilState(responseState);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Intersection Observer 생성
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 타겟 요소가 화면에 나타남
          setTimeout(() => refetch(), 500);
        }
      });
    });
    // 감시 대상 요소들

    if (scrollRef.current) {
      const targetElements = document.querySelector(".target-div");
      observer.observe(targetElements!);
    }
    return () => observer.disconnect();
  }, [filterStates, scrollRef.current]);

  // 시작일 종료일 만들기
  const startDate = format(filterStates.startDate, "yyyy-MM-dd");
  const endDate = filterStates.endDate
    ? format(filterStates.endDate, "yyyy-MM-dd")
    : startDate;

  // 리액트 쿼리
  const { refetch, isLoading, isError } = useQuery({
    queryKey: ["accommodations", filterStates.current],
    queryFn: () =>
      fetchAccommodationsData(
        filterStates.current.locale,
        startDate,
        endDate,
        filterStates.current.category,
        filterStates.current.amount,
        responseStates.pageIndex
      ),
    staleTime: 500000,
    onSuccess: data => {
      setResponseStates(prev => ({
        pageIndex: prev.pageIndex + 1,
        responseArray: [...prev.responseArray, ...data.accommodations],
      }));
    },
  });

  if (isLoading) {
    return (
      <div className="home__animation-container">
        <LoadingAnimation width="200px" height="200px" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="home__animation-container">
        <ErrorAnimation width="200px" height="200px" />
        <p>에러가 발생하였습니다. 다시 시도해주세요!</p>
      </div>
    );
  }

  return (
    <div className="home-wrapper">
      <div className="home-inner">
        {detailFiltered.length === 0
          ? responseStates.responseArray.map((acc: Accommodation) => (
              <AccomodationItem key={acc.id} data={acc} />
            ))
          : detailFiltered.map(acc => (
              <AccomodationItem key={acc.id} data={acc} />
            ))}
        <div className="target-div" ref={scrollRef}>
          @2023 빨리 잡아
        </div>
      </div>
    </div>
  );
};

export default Home;
