import { Swiper, SwiperSlide } from "swiper/react";
import { Order } from "@/types/order";
import numberFormat from "@/utils/numberFormat";
import OrderRoomItem from "../orderRoomItem/OrderRoomItem";

import "swiper/css";
import "./orderListItem.scss";
import { deleteOrderApi } from "@/api/deleteOrderApi";
import { SetStateAction, memo } from "react";
import { Badge, Button } from "@/components/common";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getOrderApi } from "@/api/getOrderApi";

const OrderListItem = memo(
  ({ roomInfo, reservedList, setReservedList }: OrderListItemProps) => {
    const { orderDate, orderItems, totalPrice, orderStatus, orderId } =
      roomInfo;

    const formattedTotalPrice = numberFormat(totalPrice);

    const { refetch } = useQuery("orderListData", getOrderApi);

    const queryClient = useQueryClient();

    const deleteOrderMutation = useMutation(deleteOrderApi, {
      onSuccess: () => {
        queryClient.invalidateQueries("orderListData");
      },
    });

    const handleCancel = async () => {
      const bookingCancelConfirm = confirm("정말 취소하시겠습니까?");
      if (bookingCancelConfirm) {
        if (reservedList && setReservedList) {
          const updatedReservedList = reservedList.filter(
            order => order.orderId !== orderId
          );
          setReservedList(updatedReservedList);
          await deleteOrderMutation.mutate(orderId);
          await refetch();
        }
      }
    };

    return (
      <div className="order-list-item">
        <div className="order-list-item__header">
          <div className="order-list-item__left">
            <h4 className="text-subtitle5">{orderDate}</h4>
          </div>
          <div className="order-list-item__right">
            {orderStatus === "canceled" ? (
              <Badge text={"예약 취소"} badgeStatus={orderStatus} />
            ) : null}
            {orderStatus === "used" ? (
              <Badge text={"사용 완료"} badgeStatus={orderStatus} />
            ) : null}
            <h5 className="text-subtitle5">총 {formattedTotalPrice}원</h5>
          </div>
        </div>
        <div className="order-list-item__body">
          <Swiper
            spaceBetween={8}
            slidesPerView={orderItems.length === 1 ? 1 : 1.5}
            className="order-list-item__swiper"
          >
            {orderItems.map((roomInfo, index) => (
              <SwiperSlide key={index}>
                <OrderRoomItem pageType={"orderList"} roomInfo={roomInfo} />
              </SwiperSlide>
            ))}
          </Swiper>
          {orderStatus === "reserved" && (
            <Button
              text={"취소하기"}
              buttonSize="exLarge"
              shape="line"
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    );
  }
);

export default OrderListItem;

interface OrderListItemProps {
  roomInfo: Order;
  reservedList?: Order[];
  setReservedList?: React.Dispatch<SetStateAction<Order[]>>;
}
