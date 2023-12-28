import "./button.scss";

interface ButtonType {
  text: string;
  buttonSize?: "small" | "large" | "exLarge";
  shape?: "fill" | "line";
  colorName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isPassed?: boolean | boolean[] | null | undefined;
  type?: "button" | "submit";
}

const Button = ({
  text,
  buttonSize,
  shape,
  colorName,
  onClick,
  isPassed,
  type,
}: ButtonType) => {
  return (
    <button
      className={`common-button ${buttonSize} ${shape}-${colorName} ${
        isPassed ? "" : "disabled"
      }`}
      onClick={onClick}
      type={type}
      disabled={!isPassed}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  buttonSize: "small",
  shape: "fill",
  colorName: "coral500",
  isPassed: true,
  type: "button",
};

export default Button;
