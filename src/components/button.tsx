"use client";
import { LoadingIcon } from "./loading-icon";

interface ICustomButton {
  buttonText: string;
  customStyle?: string;
  onClickFunc?: Function;
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const CustomButton = (props: ICustomButton) => {
  const {
    buttonText = "",
    customStyle = "",
    onClickFunc,
    disabled = false,
    fullWidth = true,
    isLoading = false,
  } = props;

  const action = () => {
    if (onClickFunc) return onClickFunc();
    return null;
  };

  const defaultStyle = `border-0 bg-primary text-xs tracking-wider 
  ${fullWidth && "w-full hover:text-white shadow-md"}`;

  const extraStyle = `${customStyle} ${defaultStyle}`;

  const disabledStyle = `${
    disabled ? "!cursor-not-allowed border !border-primary" : "hover:text-white"
  } ${extraStyle}`;

  return (
    <button
      onClick={() => action()}
      disabled={disabled}
      className={`${extraStyle} ${disabledStyle} `}
    >
      {isLoading && (
        <div className="flex justify-center items-center">
          <LoadingIcon size="35" color="#EAB096" />
        </div>
      )}

      {!isLoading && buttonText}
    </button>
  );
};
