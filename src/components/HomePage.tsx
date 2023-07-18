import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { CheckEmail } from "./sign-up/check-email";
import { CheckConfirmCode } from "./sign-up/check-confirm-code";
import { SetPassword } from "./sign-up/set-password";
import { SignIn } from "./sign-in/sign-in";

export const HomePage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/check-confirm-code" element={<CheckConfirmCode />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};
