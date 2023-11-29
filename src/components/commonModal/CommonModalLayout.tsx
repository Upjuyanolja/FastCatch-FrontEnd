import { useState } from "react";
import CommonButton from "../commonButton/CommonButton";
import "./commonModalLayout.scss";
import { IoClose } from "react-icons/io5";

type Size = "small" | "large";

interface buttonInfo {
  text: string;
  size?: string;
  colorName?: string;
  onClick: () => void;
}

interface modalPropI {
  title: string;
  content: string;
  buttons: buttonInfo[];
}

const CommonModalLayout = ({ title, content, buttons }: modalPropI) => {

  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <>
    {isVisible && (
      <>
        <div className='modal-bg'></div>
        <div className="modal-wrap">
          <div className="modal-wrap__header">
            <p className="text-subtitle4">{title}</p>
            <button className='btn-close' onClick={closeModal}>
              <IoClose />
            </button>
          </div>
          <div className="modal-wrap__body">
            <p className="text-body2">
              {content}
            </p>
          </div>
          <div className="modal-wrap__footer">
          {buttons.map((button, index) => (
                <CommonButton
                  key={index}
                  text={button.text}
                  buttonSize={button.size as Size}
                  colorName={button.colorName}
                  onClick={() => {
                    button.onClick();
                    closeModal();
                  }}
                />
            ))}
          </div>
        </div>
      </>
    )}
    </>
  )
}

export default CommonModalLayout