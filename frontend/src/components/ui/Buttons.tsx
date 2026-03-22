interface ButtonInfo {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Buttons = ({
  children,
  className,
  disabled = false,
  type = "submit",
}: ButtonInfo) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`rounded-[28px] bg-button text-white cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className || ""}`}
    >
      {children}
    </button>
  );
};
