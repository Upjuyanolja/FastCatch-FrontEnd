import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import "../users.scss";
import TermsAgreement from "@/src/components/termsAgreement/TermsAgreement";
import { CommonButton } from "@/src/components";
import { sendRequest } from "@/src/hooks/apiHook";

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

  interface SignupData {
    name: string;
    email: string;
    nickname: string;
    birthday: string;
    phoneNumber: string;
    password: string;
  }

  const [isAllCheck, setIsAllCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupData>();
  const onSubmit = (data: SignupData) => {
    if (isAllCheck) {
      sendRequest({
        method: "post",
        url: "/members/signup",
        data,
      });
      reset();
    }
  };

  return (
    <>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="login-wrap__body">
                <div className="input-inner">
                  <label htmlFor="">이름</label>
                  <input
                    type="text"
                    placeholder="이름을 입력하세요"
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
                  <label htmlFor="">이메일</label>
                  <input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    {...register("email", {
                      required: "이메일을 입력하세요",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "유효한 이메일 주소를 입력하세요",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="alert-message">{errors.email.message}</p>
                  )}
                </div>
                <div className="input-inner">
                  <label htmlFor="">닉네임</label>
                  <div className="input-inner__item">
                    <input
                      type="text"
                      placeholder="닉네임을 입력하세요"
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
                    />
                    <button className="btn-check">중복확인</button>
                  </div>
                  {errors.nickname && (
                    <p className="alert-message">{errors.nickname.message}</p>
                  )}
                </div>
                <div className="input-inner">
                  <label htmlFor="">생년월일</label>
                  <input
                    type="text"
                    placeholder="생년월일을 입력하세요 (yyyy-mm-dd)"
                    {...register("birthday", {
                      required: "생년월일을 입력하세요",
                      pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/,
                        message:
                          "올바른 형식의 생년월일을 입력하세요 (yyyy-mm-dd)",
                      },
                    })}
                  />
                  {errors.birthday && (
                    <p className="alert-message">{errors.birthday.message}</p>
                  )}
                </div>
                <div className="input-inner">
                  <label htmlFor="">휴대폰 번호</label>
                  <input
                    type="number"
                    placeholder="숫자만 입력하세요"
                    {...register("phoneNumber", {
                      required: "휴대폰 번호를 입력하세요",
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
                      {isPwVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="alert-message">{errors.password.message}</p>
                  )}
                </div>
                <TermsAgreement
                  isAllCheck={isAllCheck}
                  setIsAllCheck={setIsAllCheck}
                />
                <CommonButton
                  buttonSize="large"
                  text="회원가입"
                  isPassed={isAllCheck}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;