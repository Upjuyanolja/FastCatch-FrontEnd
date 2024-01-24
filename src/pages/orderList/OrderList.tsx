import { useMemo } from "react";
import MembersHeader from "@/pages/members/membersHeader/MembersHeader";
import OrderListItem from "@/pages/orderList/orderListItem/OrderListItem";
import { Button, ToastLayout } from "@/components/common";
import "./orderList.scss";
import ErrorAnimation from "@/components/errorAnimation/ErrorAnimation";
import LoadingAnimation from "@/components/loadingAnimation/LoadingAnimation";
import { useGetReservationList } from "@/hooks/quries/useReservationList";
import { useGetCancelReservationList } from "@/hooks/quries/useCancelReservationList";

const OrderList = () => {
  const { showToast, ToastContainer } = ToastLayout();
  const today = new Date();

  /*예약 목록 데이터 */
  const { data, fetchNextPage, hasNextPage, isError, isLoading, refetch } =
    useGetReservationList();

  const reservationItems = useMemo(
    () => data?.pages.flatMap(page => page.data.reservations),
    [data]
  );

  const handleLoadMore = () => {
    if (hasNextPage) fetchNextPage();
    else {
      showToast({
        theme: "info",
        message: '"더이상 불러올 데이터가 없습니다"',
      });
    }
  };

  /**예약 취소 목록 데이터 */
  const {
    data: cancelData,
    fetchNextPage: cancelFetchNextPage,
    hasNextPage: cancelHasNextPage,
    refetch: cancelRefecth,
  } = useGetCancelReservationList();

  const cancelReservationItems = useMemo(
    () => cancelData?.pages.flatMap(page => page.data.reservations),
    [cancelData]
  );

  const cancelHandleLoadMore = () => {
    if (cancelHasNextPage) cancelFetchNextPage();
    else {
      showToast({
        theme: "info",
        message: '"더이상 불러올 데이터가 없습니다"',
      });
    }
  };

  if (isLoading) {
    return <LoadingAnimation width="200px" height="200px" />;
  }

  if (isError) {
    return <ErrorAnimation width="200px" height="200px" />;
  }

  return (
    <div className="order-list">
      <div className="order-list__header">
        <MembersHeader />
      </div>
      <div className="order-list__body">
        <div className="order-list__booking-history">
          <h5 className="text-subtitle4">예약 내역</h5>
          <div className="order-list__item">
            {reservationItems?.length !== 0 ? (
              reservationItems?.map(item => {
                const itemDate = new Date(item.startDate);
                const cancellAble = itemDate > today;
                return (
                  <OrderListItem
                    key={item.id}
                    roomInfo={item}
                    cancellAble={cancellAble}
                    refetch={refetch}
                    cancelRefetch={cancelRefecth}
                  />
                );
              })
            ) : (
              <p className="order-list__error-msg">내역이 존재하지 않습니다</p>
            )}
            <Button
              text={"더보기"}
              buttonSize="exLarge"
              onClick={handleLoadMore}
              isPassed={hasNextPage}
            />
          </div>
        </div>
        <div className="order-list__refund-history">
          <h5 className="text-subtitle4">취소 내역</h5>
          <div className="order-list__item">
            {cancelReservationItems?.length !== 0 ? (
              cancelReservationItems?.map(item => (
                <OrderListItem
                  key={item.id}
                  roomInfo={item}
                  cancellAble={false}
                  isCanceled={true}
                />
              ))
            ) : (
              <p className="order-list__error-msg">내역이 존재하지 않습니다</p>
            )}
            <Button
              text={"더보기"}
              buttonSize="exLarge"
              onClick={cancelHandleLoadMore}
              isPassed={cancelHasNextPage}
            />
          </div>
        </div>
      </div>
      {ToastContainer}
    </div>
  );
};

export default OrderList;
