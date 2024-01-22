export interface regionCategory {
  ALL: "전체";
  GYEONGGI: "경기";
  SEOUL: "서울";
  GANGWON: "강원";
  CHUNGCHEONG: "충청";
  HONAM: "호남";
  GYEONGSANG: "경상";
  JEJU: "제주";
}

export const regionData: regionCategory = {
  ALL: "전체",
  GYEONGGI: "경기",
  SEOUL: "서울",
  GANGWON: "강원",
  CHUNGCHEONG: "충청",
  HONAM: "호남",
  GYEONGSANG: "경상",
  JEJU: "제주",
};

export interface AccommodationCategory {
  [ALL: string]: string;
}

export const accommodationCategoryData: AccommodationCategory = {
  ALL: "전체",
  PENSION: "펜션/풀빌라",
  HOTELRESORT: "호텔/리조트",
  MOTEL: "모텔",
  GUESTHOUSE: "게스트하우스",
};
