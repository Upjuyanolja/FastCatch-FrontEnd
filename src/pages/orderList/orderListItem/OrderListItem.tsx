import OrderRoomItem from "../orderRoomItem/OrderRoomItem";
import "swiper/css";
import "./orderListItem.scss";
import { memo } from "react";
import { Badge, Button } from "@/components/common";
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { Reservation, ResponseReservation } from "@/api/getReservationListApi";
import { useDeleteCancelReservation } from "@/hooks/quries/useDeleteCancelReservation";
import { AxiosError, AxiosResponse } from "axios";

const OrderListItem = memo(
  ({
    roomInfo,
    cancellAble,
    isCanceled,
    refetch,
    cancelRefetch,
  }: ReservationListItemProps) => {
    const { date, id } = roomInfo;

    const deleteCancelReservationMutation = useDeleteCancelReservation({
      reservationId: id,
    });

    const handleCancel = async () => {
      const bookingCancelConfirm = confirm("정말 취소하시겠습니까?");
      if (bookingCancelConfirm) {
        await deleteCancelReservationMutation.mutateAsync();
        if (
          typeof refetch === "function" &&
          typeof cancelRefetch === "function"
        ) {
          await refetch();
          await cancelRefetch();
        }
      }
    };

    return (
      <div className="order-list-item">
        <div className="order-list-item__header">
          <div className="order-list-item__left">
            <h4 className="text-subtitle5">{date}</h4>
          </div>
          <div className="order-list-item__right">
            {!cancellAble && !isCanceled && (
              <Badge text="사용 완료" badgeStatus="dark" />
            )}
            {isCanceled && <Badge text="예약 취소" badgeStatus="light" />}
          </div>
        </div>
        <div className="order-list-item__body">
          <OrderRoomItem roomInfo={roomInfo} />
          {cancellAble && (
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

interface ReservationListItemProps {
  roomInfo: Reservation;
  cancellAble?: boolean;
  isCanceled?: boolean;
  refetch?: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<
    QueryObserverResult<
      InfiniteData<AxiosResponse<ResponseReservation>>,
      AxiosError
    >
  >;
  cancelRefetch?: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<
    QueryObserverResult<
      InfiniteData<AxiosResponse<ResponseReservation>>,
      AxiosError
    >
  >;
}
