import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import TermsAgreement from "@/components/termsAgreement/TermsAgreement";
import instance from "@/api/instanceApi";
import { Button, ToastLayout } from "@/components/common";

import "../users.scss";

const Signup = () => {
  // 회원가입/로그인 링크이동
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  // 패스워드 숨김/보임처리
  const [isPwVisible, setIsPwVisible] = useState(false);
  const togglePw = (field: string) => {
    if (field === "password") {
      setIsPwVisible(prev => !prev);
    }
  };

  const [isCheckPwVisible, setIsCheckPwVisible] = useState(false);
  const toggleCheckPw = (field: string) => {
    if (field === "checkPassword") {
      setIsCheckPwVisible(prev => !prev);
    }
  };

  // 변수, state
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [idError, setIdError] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<SignupData>({
    mode: "onBlur",
  });
  const email = watch("email") ?? "";
  const nickname = watch("nickname") ?? "";
  const password = watch("password") ?? "";
  const checkPassword = watch("checkPassword" ?? "");
  const name = watch("name") ?? "";
  const phoneNumber = watch("phoneNumber") ?? "";
  const { showToast, ToastContainer } = ToastLayout();

  const duplicatedNickName = async () => {
    try {
      const res = await instance.get(
        `/api/members/nickname?nickname=${nickname}`
      );

      if (res.status === 200) {
        setIsNicknameValid(true);
        showToast({ theme: "success", message: "사용가능한 닉네임입니다" });
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const duplicatedId = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  // 회원가입 폼 제출
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAllCheck && isNicknameValid) {
      const requestBody = {
        email,
        password,
        nickname,
        name,
        phoneNumber,
      };
      const signUp = async () => {
        try {
          const res = await instance.post("/api/members/signup", requestBody);
          await navigate("/login");
          return res;
        } catch (error) {
          console.log(error);
        }
      };
      signUp();
    }
  };

  // 중복확인 조건문
  const isNicknameValids =
    /^[A-Za-z가-힣]+$/.test(nickname) &&
    nickname.length >= 2 &&
    nickname.length <= 14;

  const isIdValids =
    /^[A-Za-z가-힣]+$/.test(email) &&
    nickname.length >= 2 &&
    nickname.length <= 14;
  return (
    <>
      <div className="common-bg"></div>
      <div className="user-wrap">
        <div className="bg-wrap">
          <div className="login-wrap">
            <ul className="login-wrap__header">
              <li className="header-list">
                <a href="" className="link" onClick={goToLogin}>
                  로그인
                </a>
              </li>
              <li className="header-list">
                <a href="" className="link on">
                  회원가입
                </a>
              </li>
            </ul>
            <form onSubmit={onSubmit}>
              <div className="login-wrap__body">
                <div className="input-inner">
                  <label htmlFor="">이름</label>
                  <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    {...register("name", {
                      required: "이름을 입력하세요",
                      pattern: {
                        value: /^[A-Za-z가-힣]{2,}$/,
                        message: "이름은 최소 2글자 이상 입력하세요",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="alert-message">{errors.name.message}</p>
                  )}
                </div>
                <div className="input-inner">
                  <label htmlFor="">아이디</label>
                  <div className="input-inner__item">
                    <input
                      type="email"
                      placeholder="아이디를 입력해주세요"
                      {...register("email", {
                        required: "이메일을 입력하세요",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
                          message: "유효한 이메일 주소를 입력하세요",
                        },
                      })}
                      onFocus={() => setIdError("")}
                    />
                    <button
                      className="btn-check"
                      onClick={duplicatedId}
                      disabled={!isIdValids}
                    >
                      중복확인
                    </button>
                  </div>
                  {errors.email && (
                    <p className="alert-message">{errors.email.message}</p>
                  )}
                  {idError && <p className="alert-message">{idError}</p>}
                </div>
                <div className="input-inner">
                  <label htmlFor="">닉네임</label>
                  <div className="input-inner__item">
                    <input
                      type="text"
                      placeholder="닉네임을 입력해주세요"
                      {...register("nickname", {
                        required: "닉네임을 입력하세요",
                        minLength: {
                          value: 2,
                          message: "닉네임은 최소 2글자 이상 입력하세요",
                        },
                        maxLength: {
                          value: 14,
                          message: "닉네임은 최대 14글자를 초과할 수 없습니다",
                        },
                        pattern: {
                          value: /^[A-Za-z가-힣]+$/,
                          message: "영어와 한글만 입력 가능합니다",
                        },
                      })}
                      onFocus={() => setNicknameError("")}
                    />
                    <button
                      className="btn-check"
                      onClick={duplicatedNickName}
                      disabled={!isNicknameValids}
                    >
                      중복확인
                    </button>
                  </div>
                  {errors.nickname && (
                    <p className="alert-message">{errors.nickname.message}</p>
                  )}
                  {nicknameError && (
                    <p className="alert-message">{nicknameError}</p>
                  )}
                </div>
                <div className="input-inner">
                  <label htmlFor="">휴대폰 번호</label>
                  <input
                    type="number"
                    placeholder="숫자만 입력하세요"
                    {...register("phoneNumber", {
                      required: "휴대폰 번호를 입력하세요",
                      minLength: {
                        value: 10,
                        message: "10자리 이상 입력하세요",
                      },
                      maxLength: {
                        value: 11,
                        message: "11자리 이하로 입력하세요",
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "숫자만 입력하세요",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="alert-message">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="input-inner">
                  <label htmlFor="">비밀번호</label>
                  <div className="input-inner__item">
                    <input
                      type={isPwVisible ? "text" : "password"}
                      placeholder="영문자, 숫자 포함 최소 8~20자로 입력하세요"
                      className="input-visible"
                      {...register("password", {
                        required: "비밀번호를 입력하세요",
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                          message: "영문자, 숫자 포함 최소 8~20자로 입력하세요",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="btn-visible"
                      onClick={() => togglePw("password")}
                    >
                      {isPwVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="alert-message">{errors.password.message}</p>
                  )}
                </div>
                <div className="input-inner">
                  <label htmlFor="">비밀번호 확인</label>
                  <div className="input-inner__item">
                    <input
                      type={isCheckPwVisible ? "text" : "password"}
                      placeholder="영문자, 숫자 포함 최소 8~20자로 입력하세요"
                      className="input-visible"
                      {...register("checkPassword", {
                        required: "비밀번호가 다릅니다",
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                          message: "동일한 비밀번호를 입력하세요",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="btn-visible"
                      onClick={() => toggleCheckPw("checkPassword")}
                    >
                      {isCheckPwVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  {errors.checkPassword && (
                    <p className="alert-message">
                      {errors.checkPassword.message}
                    </p>
                  )}
                </div>
                <TermsAgreement
                  isAllCheck={isAllCheck}
                  setIsAllCheck={setIsAllCheck}
                />
                <Button
                  type="submit"
                  buttonSize="large"
                  text="회원가입"
                  isPassed={isAllCheck && isNicknameValid}
                />
              </div>
            </form>
            {ToastContainer}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

interface SignupData {
  name: string;
  email: string;
  nickname: string;
  checkPassword: string;
  phoneNumber: string;
  password: string;
}
