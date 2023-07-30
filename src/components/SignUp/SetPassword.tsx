// SetPassword.js
import { Formik, Form } from "formik";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { ThemeButtons } from "../helpers/ThemeButtons";
import { FormField } from "../helpers/FormField";
import { FormSubmit } from "../helpers/FormSubmit";
import { RequestMethodsEnum, makeRequest } from "../../tools/request";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

export const SetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email") ?? undefined;
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSetPassword = async (values: any) => {
    try {
      await makeRequest({
        url: "auth/sign-up/set-password",
        body: JSON.stringify({ email, password: values.password }),
        method: RequestMethodsEnum.POST,
      });

      navigate(`/sign-in`);
    } catch (error: any) {
      setShowError("No such user");
      console.error("Ошибка при проверке доступности электронной почты", error);
    }
  };

  const handleThemeChange = (theme: any) => {
    setSelectedTheme(theme);
  };
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword: any) => !prevShowPassword);
  };
  return (
    <div className="signup-page" style={{ background: selectedTheme }}>
      <div className="container">
        <div className="login-container">
          <div className="form-error form-error-top">{showError}</div>
          <div className="circle circle-one"></div>
          <div className="form-container">
            <img
              src="https://static.wixstatic.com/media/2ecac5_fb91a15ae6434ef1928c733eace04bf3~mv2.png/v1/crop/x_53,y_0,w_427,h_533/fill/w_512,h_639,al_c,lg_1,q_85,enc_auto/Saly-43_edited.png"
              alt="illustration"
              className="illustration"
            />
            <h1 className="opacity form-title">Sign up</h1>
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={handleSetPassword}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormField
                    type="email"
                    name="usernamecode"
                    placeholder="Email"
                    value={email}
                  />
                  <div className="password-field">
                    <FormField
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                    />
                    {showPassword ? (
                      <FaEyeSlash onClick={toggleShowPassword} />
                    ) : (
                      <FaEye onClick={toggleShowPassword} />
                    )}
                  </div>
                  <FormSubmit buttonText="Register" isSubmitting={isSubmitting} />
                </Form>
              )}
            </Formik>
          </div>
          <div className="circle circle-two"></div>
        </div>
        <ThemeButtons handleThemeChange={handleThemeChange} />
      </div>
    </div>
  );
};
