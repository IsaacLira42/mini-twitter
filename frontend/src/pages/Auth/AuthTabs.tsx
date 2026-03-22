import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

type TabChoices = "Login" | "Register";

interface AuthTabsProps {
  tabDefault?: TabChoices;
}

export const AuthTabs = ({ tabDefault = "Login" }: AuthTabsProps) => {
  const [currentTab, setCurrentTab] = useState<TabChoices>(tabDefault);

  const handleAlterTab = (newCurrentTab: TabChoices) => {
    if (currentTab !== newCurrentTab) {
      setCurrentTab(newCurrentTab);
    }
  };

  return (
    <div>
      <div className="flex mb-4 h-11 my-14! border-b border-gray-300 dark:border-text-body-dark">
        <button
          className={`
          pb-2 flex-1 h-full font-bold transition-all duration-150
          ${
            currentTab === "Login"
              ? "border-b-4 border-button text-button dark:text-text-body-dark -mb-px"
              : "text-text-body-light dark:text-text-body-dark hover:text-gray-600 dark:hover:text-gray-300"
          }
        `}
          onClick={() => handleAlterTab("Login")}
        >
          Login
        </button>
        <button
          className={`
          pb-2 flex-1 h-full font-bold transition-all duration-150
          ${
            currentTab === "Register"
              ? "border-b-4 border-button text-button dark:text-text-body-dark -mb-px"
              : "text-text-body-light dark:text-text-body-dark hover:text-gray-600 dark:hover:text-gray-300"
          }
        `}
          onClick={() => handleAlterTab("Register")}
        >
          Cadastrar
        </button>
      </div>

      {currentTab === "Login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};
