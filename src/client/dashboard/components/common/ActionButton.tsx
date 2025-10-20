import type React from "react";

interface ActionButtonsProps {
  disabled?: boolean;
  onClick?: () => void;
  sx?: string;
  children: React.ReactNode;
  Icon?: string;
}

const ActionButton = ({
  onClick,
  disabled,
  sx,
  children,
  Icon,
}: ActionButtonsProps) => {
  return (
    <button
      className={`p-2 rounded-lg border-0 flex items-center cursor-pointer w-fit ${sx}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <i className={`mr-2 ${Icon}`}></i>}
      <span>{children}</span>
    </button>
  );
};
export default ActionButton;
