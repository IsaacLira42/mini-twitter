interface ButtonInfo {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Buttons = ({
  children,
  className,
  disabled = false,
  type = "submit",
  onClick,
}: ButtonInfo) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-[28px] bg-button text-white cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className || ""}`}
    >
      {children}
    </button>
  );
};
