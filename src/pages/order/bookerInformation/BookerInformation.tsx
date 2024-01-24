import { useValidation } from "@/hooks/useValidation";
import {
  REGEX_NAME,
  REGEX_PHONE_NUMBER,
  validationErrorMessage,
} from "@/constant/validation";
import { useEffect } from "react";

import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import { Input } from "@/components/common";
import "./bookerInformation.scss";

import "./bookerInformation.scss";

const BookerInformation = ({
  userName,
  setUserName,
  userPhoneNumber,
  setUserPhoneNumber,
  setIsBookerValidationPass,
}: BookerInformationProps) => {
  const userInfo = useRecoilValue(userState);
  const { isValidation: isUserNameValidation } = useValidation(
    userName,
    REGEX_NAME
  );
  const { isValidation: isPhoneNumberValidation } = useValidation(
    userPhoneNumber,
    REGEX_PHONE_NUMBER
  );

  useEffect(() => {
    if (userState) {
      setUserName(userInfo?.name || "");
      setUserPhoneNumber(userInfo?.phone || "");
      setIsBookerValidationPass(true);
    }
  }, [userState]);

  const checkUserValidation = () => {
    setIsBookerValidationPass(isUserNameValidation && isPhoneNumberValidation);
  };

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleUserPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPhoneNumber(e.target.value);
  };

  return (
    <div className="booker-information">
      <h4 className="text-subtitle4">예약자 정보</h4>
      <div className="booker-information__input">
        <Input
          title={"예약자 이름"}
          placeholder={"예약자 이름을 입력해주세요"}
          onChange={handleUserName}
          value={userName}
          onBlur={checkUserValidation}
          inputStyle={isUserNameValidation ? "default" : "inValid"}
          inValidAlertMessage={validationErrorMessage.nameErrorMsg}
        />
        <Input
          title={"휴대폰 번호"}
          placeholder={"휴대폰 번호를 입력해주세요"}
          onChange={handleUserPhoneNumber}
          value={userPhoneNumber}
          onBlur={checkUserValidation}
          inputStyle={isPhoneNumberValidation ? "default" : "inValid"}
          inValidAlertMessage={validationErrorMessage.phoneNumberErrorMsg}
        />
      </div>
    </div>
  );
};

export default BookerInformation;

interface BookerInformationProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  userPhoneNumber: string;
  setUserPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setIsBookerValidationPass: React.Dispatch<React.SetStateAction<boolean>>;
}
