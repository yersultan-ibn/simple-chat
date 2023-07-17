import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage/LoginPage";
import { ReportsPage } from "./ReportsPage/ReportsPage";
import { SignUp } from "./sign-up/sign-up";

export const HomePage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignUp />} />
        <Route path="/" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
