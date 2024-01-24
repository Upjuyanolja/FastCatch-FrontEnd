import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { Coupon } from "@/types/accommodationDetail";

const MAX_DISCOUNT = 0;

interface RoomImgSwiperProps {
  roomImg: object[];
  coupons: Coupon[];
}
const RoomImgSwiper = ({ roomImg, coupons }: RoomImgSwiperProps) => {
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
      {roomImg.map((obj: any, i) => (
        <div key={i}>
          <SwiperSlide key={`slide-${i}`}>
            {coupons.length > 0 && (
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
                <span>{coupons[MAX_DISCOUNT]?.name}</span>

                <span>적용 가능 객실</span>
              </div>
            )}

            <img
              style={{
                height: "264px",
                width: "100%",
                objectFit: "cover",
              }}
              src={`${obj}`}
              alt={"이미지"}
              loading="lazy"
            />
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  );
};
export default RoomImgSwiper;
