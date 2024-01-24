import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ModalLayout, ModalPortal } from "../..";
import { MdLogout } from "react-icons/md";

import { userState } from "@/states/userState";
import instance from "@/api/instanceApi";
import { removeCookie } from "@/utils/cookies";
import { AxiosError } from "axios";

const LogoutButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const setUserInfo = useSetRecoilState(userState);
  const navigate = useNavigate();

  const modalProps = {
    title: "로그아웃",
    content: "로그아웃 하시겠습니까?",
    buttons: [
      {
        text: "확인",
        size: "small",
        colorName: "coral500",
        onClick: () => {
          const logOut = async () => {
            try {
              await instance.delete(`/api/auth/logout`);
              localStorage.removeItem("accessToken");
              removeCookie();
              setUserInfo(null);
              navigate("/");
            } catch (error) {
              if (error instanceof AxiosError) {
                const res = error.response?.data.code;
                if (res === 1005) {
                  alert("회원 정보를 찾을 수 없습니다.");
                  removeCookie();
                  setUserInfo(null);
                } else {
                  alert("이미 로그아웃한 회원입니다.");
                  removeCookie();
                  setUserInfo(null);
                }
              }
            }
          };

          logOut();
          setModalVisible(false);
        },
      },
      {
        text: "취소",
        size: "small",
        colorName: "coral200",
        onClick: () => {
          setModalVisible(false);
        },
      },
    ],
  };

  const logoutHandler = () => {
    setModalVisible(true);
  };

  return (
    <>
      <button className="header__cart-button" onClick={logoutHandler}>
        <MdLogout className="cart-button__icon" />
      </button>
      {modalVisible && (
        <ModalPortal>
          <ModalLayout
            {...modalProps}
            isVisible={modalVisible}
            setIsVisible={setModalVisible}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default LogoutButton;
