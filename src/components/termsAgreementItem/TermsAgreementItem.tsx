import React from "react";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";
import { ReactNode } from "react";

import "./termsAgreementItem.scss";

const TermsAgreementItem = ({
  state,
  setState,
  labelText,
  className,
  id,
  name,
}: TermsAgreementItemProps) => {
  return (
    <div className="terms-agreement__item">
      <input
        type="checkbox"
        id={id}
        checked={state}
        name={name}
        onChange={() => {
          setState(!state);
        }}
      />
      {state ? (
        <IoCheckbox
          className={"terms-agreement__selected"}
          onClick={() => {
            setState(!state);
          }}
        />
      ) : (
        <IoSquareOutline
          className={"terms-agreement__unselected"}
          onClick={() => {
            setState(!state);
          }}
        />
      )}
      <label htmlFor={id} className={`${className}`}>
        {labelText}
      </label>
    </div>
  );
};

export default TermsAgreementItem;

interface TermsAgreementItemProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  labelText: ReactNode;
  className: string;
  id: string;
  name: string;
}
