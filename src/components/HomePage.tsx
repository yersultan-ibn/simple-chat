import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage/LoginPage";
import { ReportsPage } from "./ReportsPage/ReportsPage";
import { SignUp } from "./sign-up/check-email";
import { Dashboard } from "./Dashboard/dashboard";
import { CheckConfirmCode } from "./sign-up/check-confirm-code";
import { SetPassword } from "./sign-up/set-password";

export const HomePage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/check-email" element={<SignUp />} />
        {/* <Route path="/check-confirm-code" element={<CheckConfirmCode />} /> */}
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
