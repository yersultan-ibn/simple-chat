import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckEmail } from "./SignUp/CheckEmail";
import { CheckConfirmCode } from "./SignUp/CheckConfirmCode";
import { SetPassword } from "./SignUp/SetPassword";
import { SignIn } from "./SignIn/SignIn";
import { useEffect, useState } from "react";
import { Dashboard } from "./Dashboard/Dashboard";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import { Loader } from "./index";

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

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
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/check-confirm-code" element={<CheckConfirmCode />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
};
