import { Box, Button } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThemeButtons } from "../helpers/theme-buttons";
import { FormField } from "../helpers/form-field";
import { FormSubmit } from "../helpers/form-submit";
import { RequestMethodsEnum, makeRequest } from "../../tools/request";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email format")
    .min(3, "Email address must have at least 3 characters")
    .required("Email is required"),
});

export const CheckEmail = () => {
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [showError, setShowError] = useState("");

  const checkEmailAvailability = async (values: any) => {
    try {
      const data = await makeRequest({
        url: "auth/sign-up/check-email",
        body: JSON.stringify({ email: values.username }),
        method: RequestMethodsEnum.POST,
      });

      console.log(data);
      navigate("/check-confirm-code?email=" + values.username);
    } catch (error: any) {
      console.log(error);
      setShowError(
        "We have already sent a confirmation code. Please check your email."
      );
      console.error("Ошибка при проверке доступности электронной почты", error);
    }
  };

  const handleThemeChange = (theme: any) => {
    setSelectedTheme(theme);
  };

  return (
    <Box
      className="signup-page"
      component="div"
      sx={{ background: selectedTheme }}
    >
      <Box className="container">
        <div className="login-container">
          <div className="form-error form-error-top">{showError}</div>
          <div className="circle circle-one"></div>
          <div className="form-container">
            <img
              src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
              alt="illustration"
              className="illustration"
            />
            <h1 className="opacity form-title">Send to mail</h1>
            <Formik
              initialValues={{ username: "" }}
              validationSchema={validationSchema}
              onSubmit={checkEmailAvailability}
            >
              <Form>
                <FormField
                  type="text"
                  name="username"
                  placeholder="Email"
                  value={emailState}
                />
                <FormSubmit buttonText="Next" />
              </Form>
            </Formik>
            <div className="register-forget opacity">
              {showError && (
                <Link
                  to={`/check-confirm-code?email=${emailState}`}
                  className="enter-code"
                >
                  Enter code
                </Link>
              )}
            </div>
          </div>
          <div className="circle circle-two"></div>
        </div>
        <ThemeButtons handleThemeChange={handleThemeChange} />
      </Box>
    </Box>
  );
};
