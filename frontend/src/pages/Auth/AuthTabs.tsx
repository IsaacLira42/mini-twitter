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
      <div>
        <button onClick={() => handleAlterTab("Login")}>Login</button>
        <button onClick={() => handleAlterTab("Register")}>Register</button>
      </div>

      {currentTab === "Login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};
