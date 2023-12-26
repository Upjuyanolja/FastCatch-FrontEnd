import "./accomodationItem.scss";
import { useNavigate } from "react-router-dom";
import { accommodationCategoryData } from "@/constant/categories";
import { Accommodation } from "../../../types/accommodations";
import { Badge } from "@/components/common";
interface accommodationProps {
  data: Accommodation;
}

const AccommodationItem = ({ data }: accommodationProps) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`/accommodation?id=${data.id}`);
  };

  return (
    <div className="accomdationItem-container" onClick={navigateHandler}>
      <div
        className="accomdationItem-container__image-box"
        style={{
          backgroundImage: `url(https://fastcatch-image.s3.ap-northeast-2.amazonaws.com/${data.image})`,
        }}
      >
        <div className="accomdationItem-container__coupon-box">
          10,000원 즉시할인
        </div>
      </div>
      <div className="accomdationItem-container__desc-box">
        <div className="item-info">
          <div>
            <strong className="text-subtitle5">{data.name}</strong>
            <div className="text-body2 item-info__location">
              <p>{accommodationCategoryData[data.category]} </p>
            </div>
          </div>
          <div className="item-info__status">
            {data.soldOut && <Badge text="예약마감" badgeType="fill" />}
          </div>
        </div>
        <div className="item-price">
          {/* <span className="text-body1">최저가</span> */}
          <div className="coupon-box">쿠폰가</div>
          <div className="price-container">
            <div className="price"> {data.lowestPrice.toLocaleString()}원</div>
            <div className="lowest-price">
              {data.lowestPrice.toLocaleString()}원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationItem;
