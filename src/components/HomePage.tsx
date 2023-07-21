import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { CheckEmail } from "./SignUp/CheckEmail";
import { CheckConfirmCode } from "./SignUp/CheckConfirmCode";
import { SetPassword } from "./SignUp/SetPassword";
import { SignIn } from "./SignIn/SignIn";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Suspense, useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import { Dashboard } from "./Dashboard/Dashboard";

export const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader text="Loading ..." />
      ) : (
        <Routes>
          <Route path="/" element={<CheckEmail />} />
          <Route path="/check-confirm-code" element={<CheckConfirmCode />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dasboard" element={<Dashboard />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};
