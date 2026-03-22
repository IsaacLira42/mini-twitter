import { AuthTabs } from "./AuthTabs";

const Index = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-[40px] font-bold text-text-tittle-light dark:text-text-tittle-dark">
        Mini Twitter
      </h1>
      <AuthTabs />
    </div>
  );
};

export default Index;
