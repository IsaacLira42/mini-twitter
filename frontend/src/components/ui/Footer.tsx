export const Footer = () => {
  return (
    <footer className="w-full dark:bg-[#0F172B] px-10 py-4">
      <div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo/Nome */}
        <div className="flex items-center gap-2">
          <span className="text-button font-bold text-lg tracking-tight">
            Mini Twitter
          </span>
        </div>
      </div>
    </footer>
  );
};
