import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { SignUp } from "./sign-up/sign-up";

export const HomePage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
