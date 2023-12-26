import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import "../users.scss";
import instance from "@/api/instanceApi";
import { useAuth } from "@/hooks/useAuth";
import { Button, ToastLayout } from "@/components/common";
import { memberResI } from "@/types/member";

const Login = () => {
  // 회원가입/로그인 링크이동
  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/signup");
  };

  // 패스워드 숨김/보임처리
  const [isPwVisible, setIsPwVisible] = useState(false);
  const togglePw = () => {
    setIsPwVisible(prev => !prev);
  };

  // 변수, state
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<loginData>({
    mode: "onBlur",
  });
  const { showToast, ToastContainer } = ToastLayout();
  const email = watch("email");
  const password = watch("password");
  const { setToken } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = { email, password };
    try {
      const res = await instance.post("/api/members/signin", requestBody);
      const { accessToken, refreshToken, memberResponse }: memberResI =
        res.data.data;
      setToken(accessToken, refreshToken, memberResponse);
      navigate("/");
    } catch (error) {
      showToast({
        theme: "error",
        message: "아이디와 비밀번호를 확인해주세요",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="common-bg"></div>
      <div className="user-wrap">
        <div className="bg-wrap">
          <div className="login-wrap">
            <ul className="login-wrap__header">
              <li className="header-list">
                <a className="link on">로그인</a>
              </li>
              <li className="header-list">
                <a className="link" onClick={goToSignUp}>
                  회원가입
                </a>
              </li>
            </ul>
            <form onSubmit={onSubmit}>
              <div className="login-wrap__body">
                <div className="input-inner">
                  <label htmlFor="">이메일</label>
                  <input
                    type="email"
                    placeholder="이메일를 입력해주세요"
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
                  <label htmlFor="">비밀번호</label>
                  <div className="input-inner__item">
                    <div className="button-inner">
                      <input
                        placeholder="비밀번호를 입력해주세요"
                        type={isPwVisible ? "text" : "password"}
                        {...register("password", {
                          required: "비밀번호를 입력하세요",
                          pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                            message:
                              "영문자, 숫자 포함 최소 8~20자로 입력하세요",
                          },
                        })}
                        data-cy="password-input"
                      />
                      <button
                        type="button"
                        className="btn-visible"
                        onClick={() => togglePw()}
                      >
                        {isPwVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="alert-message">{errors.password.message}</p>
                    )}
                  </div>
                </div>
                <Button type="submit" text={"로그인"} buttonSize={"large"} />
                {ToastContainer}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

interface loginData {
  email: string;
  password: string;
}
