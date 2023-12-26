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
  const [idError, setIdError] = useState<string | null>(null);
  const [isIdValid, setIsIdValid] = useState<boolean | null>(null);
  const {
    register,
    formState: { errors },
    watch,
    setError,
  } = useForm<SignupData>({
    mode: "onBlur",
  });
  const email = watch("email") ?? "";
  const nickname = watch("nickname") ?? "";
  const password = watch("password") ?? "";
  const checkPassword = watch("checkPassword" ?? "");
  const name = watch("name") ?? "";
  const phone = watch("phone") ?? "";
  const { showToast, ToastContainer } = ToastLayout();

  // const duplicatedId = async () => {
  //   try {
  //     const res = await instance.get(`/api/members/email?email=${email}`);
  //     // 이 부분은 서버 개발이 진행된 후 체크해봐야 겠어요.
  //     // .env내 url은 미니 서버라서 요청 보내도 안되네요.
  //     if (res.status === 201) {
  //       setIsIdValid(true);
  //       showToast({ theme: "success", message: "사용 가능한 아이디입니다" });
  //     }
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //     // 에러 경우가 하나이므로 바로 에러 핸들링
  //     setIsIdValid(false);
  //     showToast({ theme: "error", message: "사용 불가능한 아이디입니다" });
  //   }
  // };

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
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAllCheck && isIdValid) {
      const requestBody = {
        email,
        password,
        nickname,
        name,
        phone,
      };
      const signUp = async () => {
        try {
          const res = await instance.post("/api/members/signup", requestBody);
          await navigate("/login");
          return res;
        } catch (error) {
          console.log(error);
          // 에러 코드 및 에러 메세지를 토대로 에러 핸들링
        }
      };
      signUp();
    }
  };

  // 중복확인 조건문
  const isIdValids = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);

  return (
    <>
      <div className="common-bg"></div>
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
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                        message: "유효한 이메일 주소를 입력하세요",
                      },
                    })}
                    onFocus={() => setIdError("")}
                  />
                  <button
                    className="btn-check"
                    // onClick={duplicatedId}
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
                  type="number"
                  placeholder="숫자만 입력하세요"
                  {...register("phone", {
                    required: "휴대폰 번호(-제외)를 입력하세요",
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
                isPassed={isAllCheck && isIdValid}
              />
            </div>
          </form>
          {ToastContainer}
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
