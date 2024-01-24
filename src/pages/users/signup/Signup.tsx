import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import TermsAgreement from "@/components/termsAgreement/TermsAgreement";
import { Button, ToastLayout } from "@/components/common";

import "../users.scss";
import { AxiosError } from "axios";
import instance from "@/api/instanceApi";

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
  const [idError, setIdError] = useState<string | null>(null);
  const [isIdValid, setIsIdValid] = useState<boolean | null>(null);
  const {
    register,
    formState: { errors, isValid },
    watch,
    setError,
    handleSubmit,
  } = useForm<SignupData>({
    mode: "onBlur",
  });
  const email = watch("email") ?? "";
  const nickname = watch("nickname") ?? "";
  const password = watch("password") ?? "";
  const checkPassword = watch("checkPassword") ?? "";
  const name = watch("name") ?? "";
  const phone = watch("phone") ?? "";
  const { showToast, ToastContainer } = ToastLayout();
  const [isDisabled, setIsDisabled] = useState(false);

  const duplicatedId = async () => {
    try {
      const res = await instance.post(`/api/auth/members/email`, {
        email: email,
      });
      console.log(res);
      if (res.data.isExists === false) {
        setIsIdValid(true);
        showToast({ theme: "success", message: "사용 가능한 아이디입니다" });
      } else {
        showToast({ theme: "error", message: "사용 불가능한 아이디입니다" });
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // 비밀번호 확인 동적 체크
  const handleCheckPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checkPasswordValue = e.target.value;
    if (password !== checkPasswordValue) {
      setError("checkPassword", {
        type: "manual",
        message: "동일한 비밀번호를 입력하세요",
      });
    } else {
      setError("checkPassword", {
        type: "manual",
        message: "",
      });
    }
  };

  // 회원가입 폼 제출
  const onSubmit: SubmitHandler<SignupData> = async (data, event) => {
    event?.preventDefault();
    if (isAllCheck && isIdValid) {
      const requestBody = {
        name: data.name,
        email: data.email,
        nickname: data.nickname,
        phone: data.phone,
        password: data.password,
      };
      const signUp = async () => {
        try {
          const res = await instance.post(
            "/api/auth/members/signup",
            requestBody
          );
          setIsDisabled(!isDisabled);
          showToast({
            theme: "success",
            message: "회원 가입에 성공하셨습니다",
          });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
          return res;
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            showToast({ theme: "error", message: "입력값이 잘못되었습니다" });
          }
          throw error;
        }
      };
      signUp();
    }
  };

  // 중복확인 조건문
  const isIdValids = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "유효한 이메일 주소를 입력하세요",
                        },
                      })}
                      onFocus={() => setIdError("")}
                      readOnly={isIdValid !== null}
                    />
                    <button
                      className="btn-check"
                      onClick={duplicatedId}
                      disabled={!isIdValids || isIdValid !== null}
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
                  <input
                    type="text"
                    placeholder="닉네임을 입력해주세요"
                    {...register("nickname", {
                      required: "닉네임을 입력하세요",
                      minLength: {
                        value: 2,
                        message: "닉네임은 최소 2글자 이상 입력하세요",
                      },
                      pattern: {
                        value: /^[A-Za-z가-힣]+$/,
                        message: "영어와 한글만 입력 가능합니다",
                      },
                    })}
                  />
                  {errors.nickname && (
                    <p className="alert-message">{errors.nickname.message}</p>
                  )}
                </div>
                <div className="input-inner">
                  <label htmlFor="">휴대폰 번호</label>
                  <input
                    type="text"
                    placeholder="숫자만 입력하세요"
                    {...register("phone", {
                      required: "휴대폰 번호를 입력하세요",
                      pattern: {
                        value: /^\d{3}-\d{4}-\d{4}$/,
                        message: "- 입력하세요",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="alert-message">{errors.phone.message}</p>
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
                      placeholder="동일한 비밀번호를 입력하세요"
                      className="input-visible"
                      {...register("checkPassword", {
                        required: "비밀번호가 다릅니다",
                        validate: value =>
                          value === password || "비밀번호가 다릅니다",
                      })}
                      onChange={e => handleCheckPasswordChange(e)}
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
                  isPassed={isAllCheck && isIdValid && !isDisabled && isValid}
                  onClick={handleSubmit(onSubmit)}
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
  phone: string;
  password: string;
}
