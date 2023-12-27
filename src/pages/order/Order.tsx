import { memo, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OrderItemTypes, orderState } from "@/states/orderState";
import { PostOrderApiErrorResponse, postOrderApi } from "@/api/postOrderApi";
import { useNavigate } from "react-router-dom";
import _debounce from "lodash/debounce";

import TermsAgreement from "@/components/termsAgreement/TermsAgreement";

import numberFormat from "@/utils/numberFormat";

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
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const cartParam = urlParams.get("cart");
  const totalOrderPrice = orderData.reduce(
    (total, item) => total + item.price,
    0
  );

  useEffect(() => {
    localStorage.setItem("orderState", JSON.stringify(orderData));
  }, [orderData]);

  const handleClick = () => {
    if (cartParam === "true") {
      postOrderApiFromCart();
    }
    if (cartParam === "false") {
      postOrderApiFromAccommodation();
    }
  };

  const postOrderApiFromCart = async () => {
    const cartItemIds: number[] = orderData
      .map(item => {
        return item.cartItemId;
      })
      .filter((cartId): cartId is number => typeof cartId === "number");
    const requestBody = {
      ageConsent: isAllCheck,
      reservationPersonName: userName,
      reservationPhoneNumber: userPhoneNumber,
      totalPrice: totalOrderPrice,
      cartItemIds: cartItemIds,
    };
    try {
      const res = await postOrderApi("/api/orders/carts", requestBody);
      navigate(`/order/result?result=true&orderid=${res.data.orderId}`);
    } catch (error) {
      navigate("/order/result?=false");
      const postOrderApiError = error as PostOrderApiErrorResponse;
      setOrderErrorMsg(postOrderApiError.response.data.errorMessage);
    }
  };

  const postOrderApiFromAccommodation = async () => {
    const requestBody = {
      ageConsent: isAllCheck,
      reservationPersonName: userName,
      reservationPhoneNumber: userPhoneNumber,
      totalPrice: totalOrderPrice,
      orderItems: orderData.map(item => ({
        roomId: item.id,
        startDate: item.startDate,
        endDate: item.endDate,
        defaultCount: item.defaultCapacity,
        orderPrice: item.price,
      })),
    };
    try {
      const res = await postOrderApi("/api/orders", requestBody);
      navigate(`/order/result?result=true&orderid=${res.data.orderId}`);
    } catch (error) {
      navigate("/order/result?=false");
      const postOrderApiError = error as PostOrderApiErrorResponse;
      setOrderErrorMsg(postOrderApiError.response.data.errorMessage);
    }
  };

  useEffect(() => {
    if (!isAllCheck || !isBookerValidationPass) {
      setIsAllValidationPass(false);
      return;
    }
    setIsAllValidationPass(true);
  }, [isAllCheck, isBookerValidationPass]);

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
        <PaymentMethod
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
        />
        <TermsAgreement isAllCheck={isAllCheck} setIsAllCheck={setIsAllCheck} />
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
