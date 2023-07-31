// SetPassword.js
import { Formik, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ThemeButtons } from "../helpers/ThemeButtons";
import { FormField } from "../helpers/FormField";
import { FormSubmit } from "../helpers/FormSubmit";
import { RequestMethodsEnum, makeRequest } from "../../tools/request";
import { FaSpinner } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import Swal from "sweetalert2";

type SignInValues = {
  username: string;
  password: string;
};

export const SignIn: React.FC = () => {
  const [emailState, setEmailState] = useState("");
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (values: SignInValues) => {
    try {
      const data = await makeRequest({
        url: "auth/sign-in",
        body: JSON.stringify({
          email: values.username,
          password: values.password,
        }),
        method: RequestMethodsEnum.POST,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", values.username);
      Swal.fire("Good job!", `Welcome ${values.username}`, "success");
      navigate(`/`);
    } catch (error: any) {
      setShowError("User not registered");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`,
      });
      console.error("Ошибка при проверке доступности электронной почты", error);
    }
  };

  const handleThemeChange = (theme: string) => {
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
              src="https://nambaone.app/_nuxt/img/get-limit-girl.12cfef2.svg"
              alt="illustration"
              className="illustration"
            />
            <h1 className="opacity form-title">Sign in</h1>
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={handleSignIn}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormField
                    type="text"
                    name="username"
                    placeholder="Email"
                    value={emailState}
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
                  <FormSubmit buttonText="Log in" isSubmitting={isSubmitting} />
                </Form>
              )}
            </Formik>
            <div className="have-account">
              <p> You have no account yet? </p>
              <Link
                to={`/check-email`}
                className="enter-code"
                style={{ color: "#39ff00" }}
              >
                Register
              </Link>
            </div>
          </div>
          <div className="circle circle-two"></div>
        </div>
        <ThemeButtons handleThemeChange={handleThemeChange} />
      </div>
    </div>
  );
};
