import { memo, useEffect, useState } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { OrderItemTypes, orderState } from "@/states/orderState";
import { postOrderApi, PostOrderApiErrorResponse } from "@/api/postOrderApi";
import { useNavigate } from "react-router-dom";
import _debounce from "lodash/debounce";
import TermsAgreement from "@/components/termsAgreement/TermsAgreement";
import numberFormat from "@/utils/numberFormat";
import { discountState } from "@/states/discountState";
import { couponState } from "@/states/couponState";
import { orderErrorMsgState } from "@/states/orderErrorMsgState";
import { Button } from "@/components/common";
import {
  BookerInformation,
  OrderTotalPrice,
  PaymentMethod,
  EventBanner,
  SubDescription,
  OrderItem,
} from ".";
import Discount from "@/pages/order/discount/Discount";
import DiscountBadge from "./discountBadge/DiscountBadge";
import "./order.scss";

const Order = memo(() => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("카드 결제");
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [isBookerValidationPass, setIsBookerValidationPass] = useState(false);
  const [isAllValidationPass, setIsAllValidationPass] = useState(false);
  const orderData: OrderItemTypes[] = useRecoilValue(orderState);
  const setOrderErrorMsg = useSetRecoilState(orderErrorMsgState);
  const [discountAmt, setDiscountAmt] = useRecoilState(discountState);

  const totalOrderPrice =
    discountAmt !== 0
      ? discountAmt
      : orderData.reduce((total, item) => total + item.price, 0);

  const orderDetail = useRecoilValue(orderState);
  const orderStartDate = orderDetail.length > 0 ? orderDetail[0].startDate : "";
  const orderEndDate = orderDetail.length > 0 ? orderDetail[0].endDate : "";
  const orderRoomId = orderDetail.length > 0 ? orderDetail[0].id : 0;
  const [selectedCoupon, setSelectedCoupon] = useRecoilState(couponState);

  useEffect(() => {
    localStorage.setItem("orderState", JSON.stringify(orderData));
  }, [orderData]);

  const handleClick = () => {
    postReservationsApiFromAccommodation();
  };

  const postReservationsApiFromAccommodation = async () => {
    const requestBody = {
      visitorName: userName,
      visitorPhone: userPhoneNumber,
      roomId: orderRoomId,
      startDate: orderStartDate,
      endDate: orderEndDate,
      couponId: selectedCoupon ? selectedCoupon.id : -1,
      totalPrice: totalPrice,
    };
    try {
      const res = await postOrderApi("/api/reservations", requestBody);
      navigate(`/`);
      //navigate(`/order/result?result=true&orderid=${res.data.orderId}`); 결제 완료 메세지는 다른 백엔드, 프론트엔드 팀원들과 상의 후 결정
    } catch (error) {
      navigate(`/`);
    }
  };

  useEffect(() => {
    if (!isAllCheck || !isBookerValidationPass) {
      setIsAllValidationPass(false);
      return;
    }
    setIsAllValidationPass(true);
  }, [isAllCheck, isBookerValidationPass]);

  const totalPrice = orderData.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="order">
      <form>
        {orderData.map((orderData, index) => (
          <OrderItem key={index} orderData={orderData} />
        ))}
        <OrderTotalPrice roomTotalPrice={totalOrderPrice} />
        <EventBanner />
        <BookerInformation
          userName={userName}
          setUserName={setUserName}
          userPhoneNumber={userPhoneNumber}
          setUserPhoneNumber={setUserPhoneNumber}
          setIsBookerValidationPass={setIsBookerValidationPass}
        />
        <Discount />
        <PaymentMethod
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
        />
        <TermsAgreement isAllCheck={isAllCheck} setIsAllCheck={setIsAllCheck} />
        {discountAmt > 0 && (
          <DiscountBadge savedAmt={totalPrice - discountAmt} />
        )}
        <Button
          text={`${numberFormat(totalOrderPrice)}원 예약하기`}
          buttonSize={"exLarge"}
          isPassed={isAllValidationPass}
          onClick={_debounce(() => {
            handleClick();
          }, 1000)}
        />
        <SubDescription />
      </form>
    </div>
  );
});

export default Order;
