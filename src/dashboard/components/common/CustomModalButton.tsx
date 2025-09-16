import React from "react";

type Variant = "primary" | "danger" | "secondary";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: Variant;
}

const baseClasses =
  "flex-1 py-2 px-4 rounded-md text-white transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<Variant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300",
  danger: "bg-red-600 hover:bg-red-700 disabled:bg-red-300",
  secondary: "bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300",
};

const CustomButton: React.FC<CustomButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  children,
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
