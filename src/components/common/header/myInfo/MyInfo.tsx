import { useNavigate } from "react-router-dom";
import "./myInfo.scss";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { FaUser } from "react-icons/fa";
import { getUserInfoApi } from "@/api/getUserInfoApi";

const MyInfo = () => {
  const getMyInfo = async () => {
    try {
      const { data } = await getUserInfoApi();
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
    }
  };

  const navigate = useNavigate();
  const moveToMembersHandler = () => {
    navigate("/members");
  };

  return (
    <button className="my-info-container" onClick={moveToMembersHandler}>
      <div className="my-info-profileImage">
        <FaUser className="icon" />
      </div>
    </button>
  );
};
export default MyInfo;
