import "./accomodationItem.scss";
import { useNavigate } from "react-router-dom";
import { accommodationCategoryData } from "@/constant/categories";
import { Accommodation } from "@/api/getAllAccommodationsApi";

const AccommodationItem = ({ data }: { data: Accommodation }) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`/accommodation?id=${data.id}`);
  };

  return (
    <div className="accomdationItem-container" onClick={navigateHandler}>
      <div
        className="accomdationItem-container__image-box"
        style={{
          backgroundImage: `url(${data.imageUrl})`,
        }}
      >
        {data.coupon && (
          <div className="accomdationItem-container__coupon-box">
            {data.coupon}
          </div>
        )}
      </div>
      <div className="accomdationItem-container__desc-box">
        <div className="item-info">
          <div>
            <strong className="text-subtitle5">{data.name}</strong>
            <div className="text-body2 item-info__location">
              <p>{accommodationCategoryData[data.category]} </p>
            </div>
          </div>
        </div>
        <div className="item-price">
          {data.coupon === "" ? (
            <span className="price-info">최저가</span>
          ) : (
            <div className="coupon-box">쿠폰가</div>
          )}

          <div className="price-container">
            {data.discountPrice !== data.lowestPrice && (
              <div className="price">
                {data.discountPrice.toLocaleString()}원
              </div>
            )}
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
