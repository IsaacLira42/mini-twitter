interface ButtonInfo {
  children: React.ReactNode;
  className?: string;
}

export const Buttons = ({ children, className }: ButtonInfo) => {
  return (
    <button
      type="button"
      className={`bg-button text-white cursor-pointer ${className || ""}`}
    >
      {children}
    </button>
  );
};
