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
      <div className="flex gap-4 mb-4 h-11">
        <button
          className={`
          flex-1 h-full border-b-3 transition-colors duration-150
          ${
            currentTab === "Login"
              ? "border-button text-text-body-light dark:text-text-body-dark font-medium"
              : "border-transparent text-text-body-light dark:text-text-body-dark hover:border-gray-300 dark:hover:border-gray-600"
          }
        `}
          onClick={() => handleAlterTab("Login")}
        >
          Login
        </button>
        <button
          className={`
          flex-1 h-full border-b-3 transition-colors duration-150
          ${
            currentTab === "Register"
              ? "border-button text-text-body-light dark:text-text-body-dark font-medium"
              : "border-transparent text-text-body-light dark:text-text-body-dark hover:border-gray-300 dark:hover:border-gray-600"
          }
        `}
          onClick={() => handleAlterTab("Register")}
        >
          Register
        </button>
      </div>

      {currentTab === "Login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};
