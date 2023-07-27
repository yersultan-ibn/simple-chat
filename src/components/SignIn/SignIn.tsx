// SetPassword.js
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeButtons } from "../helpers/ThemeButtons";
import { FormField } from "../helpers/FormField";
import { FormSubmit } from "../helpers/FormSubmit";
import { IoIosArrowBack } from "react-icons/io";
import { RequestMethodsEnum, makeRequest } from "../../tools/request";
import Cookies from "js-cookie";

const validationSchema = Yup.object().shape({
  // username: Yup.string()
  //   .email("Invalid email format")
  //   .min(3, "Email address must have at least 3 characters")
  //   .required("Email is required"),
  // password: Yup.string()
  //   .min(6, "Password must have at least 8 characters")
  //   .required("Password is required"),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), undefined], "Passwords must match")
  //   .required("Confirm Password is required"),
});

export const SignIn = () => {
  const location = useLocation();
  const [emailState, setEmailState] = useState("");
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");

  const handleSignIn = async (values: any) => {
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
      console.log(values.username);
      navigate(`/`);
    } catch (error: any) {
      setShowError("User not registered");
      console.error("Ошибка при проверке доступности электронной почты", error);
    }
  };

  const handleThemeChange = (theme: any) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="signup-page" style={{ background: selectedTheme }}>
      <Link to="/" className="arrow-main">
        <IoIosArrowBack />
      </Link>
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
              validationSchema={validationSchema}
              onSubmit={handleSignIn}
            >
              <Form>
                <FormField
                  type="text"
                  name="username"
                  placeholder="Email"
                  value={emailState}
                />
                <FormField type="text" name="password" placeholder="Password" />
                <FormSubmit buttonText="Log in" />
              </Form>
            </Formik>
            <div className="register-forget opacity">
              <p style={{ color: "#fff" }}> You have no account yet?</p>
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
