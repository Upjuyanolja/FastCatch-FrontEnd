import AccomodationItem from "./accomodationItem/AccomodationItem";
import LoadingAnimation from "@/components/loadingAnimation/LoadingAnimation";
import "./home.scss";

import { useEffect, useMemo, useRef } from "react";
import ErrorAnimation from "@/components/errorAnimation/ErrorAnimation";
import { useGetAllAccommodations } from "@/hooks/quries/useMain";
import { useRecoilValue } from "recoil";
import { categoryState, hasCouponState } from "@/states/categoryState";

const Home = () => {
  const category = useRecoilValue(categoryState);
  const hasCoupon = useRecoilValue(hasCouponState);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    refetch,
    remove,
  } = useGetAllAccommodations(category, hasCoupon);

  useEffect(() => {
    refetch();
    return () => {
      remove();
    };
  }, [hasCoupon, category]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Intersection Observer 생성
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) {
          // 타겟 요소가 화면에 나타남
          setTimeout(() => fetchNextPage(), 500);
        }
      });
    });
    // 감시 대상 요소들

    if (scrollRef.current) {
      const targetElements = document.querySelector(".target-div");
      observer.observe(targetElements!);
    }
    return () => observer.disconnect();
  }, [scrollRef.current]);

  const accommodationsItems = useMemo(
    () => data?.pages.flatMap(page => page.data.data.accommodations),
    [data]
  );
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
        {accommodationsItems?.map(item => <AccomodationItem data={item} />)}
        <div className="target-div" ref={scrollRef}>
          @2023 빨리 잡아
        </div>
      </div>
    </div>
  );
};

export default Home;
