export const validationErrorMessage = {
  nameErrorMsg: "이름은 한/영문자 최소 2글자 이상 입력하세요",
  phoneNumberErrorMsg:
    "휴대폰 번호를 정확하게 입력해주세요 하이픈(-) 빼고 숫자만 입력",
};

export const REGEX_NAME = /([가-힣a-zA-Z]{2,})/;
export const REGEX_PHONE_NUMBER = /^010-(\d{4})-(\d{4})$/;
export const REGEX_NICK_NAME = /^[A-Za-z가-힣]{2,14}$/;
export const REGEX_BIRTH_DAY = /^\d{4}-\d{2}-\d{2}$/;
