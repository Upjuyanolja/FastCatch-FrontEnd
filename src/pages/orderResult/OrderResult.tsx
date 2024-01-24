import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./orderResult.scss";
import { useRecoilValue } from "recoil";
import { orderResultState } from "@/states/orderResultState";

const OrderResult = () => {
  const orderResult = useRecoilValue(orderResultState);

  useEffect(() => {
    console.log("orderResult", orderResult);
  }, []);

  return (
    <div className="order-result">
      <h3 className="text-subtitle3">
        {orderResult === true
          ? "주문과 결제가 정상적으로 완료되었습니다."
          : "주문과 결제가 실패했습니다."}
      </h3>
      <div className="order-result__button-wrap">
        {orderResult ? (
          <Link
            to={"/members/orderlist"}
            className="order-result__order-list-button text-body2"
          >
            결제 정보 확인
          </Link>
        ) : (
          ""
        )}
        <Link to={"/"} className="order-result__home-button text-body2">
          홈으로 가기
        </Link>
      </div>
    </div>
  );
};

export default OrderResult;
