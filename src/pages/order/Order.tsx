import { memo, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { OrderItemTypes, orderState } from "@/states/orderState";
import _debounce from "lodash/debounce";

import TermsAgreement from "@/components/termsAgreement/TermsAgreement";

import numberFormat from "@/utils/numberFormat";
import { discountState } from "@/states/discountState";
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
import { initialPaymentMethod } from "@/constant/initialPaymentMethod";
import { usedCouponState } from "@/states/usedCouponState";
import { usePostOrder } from "@/hooks/quries/usePostOrder";
import LoadingAnimation from "@/components/loadingAnimation/LoadingAnimation";

const Order = memo(() => {
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(initialPaymentMethod[0]);
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [isBookerValidationPass, setIsBookerValidationPass] = useState(false);
  const [isAllValidationPass, setIsAllValidationPass] = useState(false);
  const orderData: OrderItemTypes[] = useRecoilValue(orderState);
  const discountAmt = useRecoilValue(discountState);
  const totalOrderPrice =
    discountAmt !== 0
      ? discountAmt
      : orderData.reduce((total, item) => total + item.price, 0);
  const usedCoupon = useRecoilValue(usedCouponState);

  const requestBody = {
    roomId: orderData[0].id,
    visitorName: userName,
    visitorPhone: userPhoneNumber,
    startDate: orderData[0].startDate,
    endDate: orderData[0].endDate,
    couponId: usedCoupon?.id,
    totalPrice: totalOrderPrice,
    payMethod: selectedMethod.payMethod,
  };

  const postOrderMutation = usePostOrder(requestBody);
  const totalPrice = orderData.reduce((sum, item) => sum + item.price, 0);

  const handleClick = async () => {
    await postOrderMutation.mutateAsync();
  };

  useEffect(() => {
    localStorage.setItem("orderState", JSON.stringify(orderData));
  }, [orderData]);

  useEffect(() => {
    setIsAllValidationPass(isAllCheck && isBookerValidationPass);
  }, [isAllCheck, isBookerValidationPass]);

  return (
    <div className="order">
      <form>
        {postOrderMutation.isLoading && (
          <LoadingAnimation width="200px" height="200px" />
        )}
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
