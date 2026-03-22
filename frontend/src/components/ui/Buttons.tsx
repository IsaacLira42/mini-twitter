interface ButtonInfo {
  children: React.ReactNode;
  className?: string;
}

export const Buttons = ({ children, className }: ButtonInfo) => {
  return (
    <button
      type="submit"
      className={`rounded-[28px] bg-button text-white cursor-pointer ${className || ""}`}
    >
      {children}
    </button>
  );
};
