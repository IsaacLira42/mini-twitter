import { AuthTabs } from "./AuthTabs";

const Index = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-120">
        <h1 className="text-[40px] text-center font-bold text-text-tittle-light dark:text-text-tittle-dark">
          Mini Twitter
        </h1>
        <AuthTabs />

        <p className="mt-10! font-[12px] text-center text-text-body-light dark:text-text-body-dark">
          Ao clicar em continuar, você concorda com nossos <br /> Termos de
          Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  );
};

export default Index;
