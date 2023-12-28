import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

interface RoomImgSwiperProps {
  roomImg: object[];
}
const RoomImgSwiper = ({ roomImg }: RoomImgSwiperProps) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={6}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 5000,
      }}
      resistance={false}
      style={{ height: "264px", margin: "0 4px" }}
    >
      {roomImg.map((obj: any) => (
        <>
          <SwiperSlide key={obj.fileName}>
            {/* 추가 부분 */}
            {/* if / HasCoupon / true  */}
            <div
              style={{
                width: "120px",
                height: "80px",

                backgroundColor: "#FE395B",
                color: "#FFF",

                position: "fixed",
                left: "17px",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                fontWeight: "700",
                lineHeight: "24px",
              }}
            >
              <span>10000 원 할인</span>
              <span>적용 가능 객실</span>
            </div>

            <img
              style={{
                height: "264px",
                width: "100%",
                objectFit: "cover",
              }}
              src={`https://fastcatch-image.s3.ap-northeast-2.amazonaws.com/${obj.fileName}`}
              alt={"이미지"}
              loading="lazy"
            />
          </SwiperSlide>
        </>
      ))}
    </Swiper>
  );
};
export default RoomImgSwiper;
