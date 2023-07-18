import { Box, Button, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email format")
    .min(3, "Email must be at least 3 characters")
    .required("Email is required"),
});
const themes = [
  {
    background: "#1A1A2E",
    color: "#FFFFFF",
    primaryColor: "#0F3460",
  },
  {
    background: "#461220",
    color: "#FFFFFF",
    primaryColor: "#E94560",
  },
  {
    background: "#192A51",
    color: "#FFFFFF",
    primaryColor: "#967AA1",
  },
  {
    background: "#F7B267",
    color: "#000000",
    primaryColor: "#F4845F",
  },
  {
    background: "#F25F5C",
    color: "#000000",
    primaryColor: "#642B36",
  },
  {
    background: "#231F20",
    color: "#FFF",
    primaryColor: "#BB4430",
  },
];

export const CheckEmail = () => {
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [showError, setShowError] = useState("");

  const checkEmailAvailability = async (values: any) => {
    try {
      const response = await fetch(
        "https://simple-chat-api-production.up.railway.app/api/auth/sign-up/check-email",
        {
          method: "POST",
          body: JSON.stringify({ email: values.username }),
        }
      );
      if (response.ok) {
        const data = response.json();

        navigate("/check-confirm-code?email=" + values.username);
      } else {
        setEmailState(values.username);
        setShowError(
          "We have already sent code confirmation. Please check your email"
        );
      }

      console.log("Email availability check successful");
    } catch (error) {
      console.error("Error checking email availability", error);
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
            <h1 className="opacity form-title">Send an email</h1>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={checkEmailAvailability}
            >
              <Form>
                <Field type="text" name="username" placeholder="Email" />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="form-error"
                />
                {/* <Field type="password" name="password" placeholder="password" />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="form-error"
                /> */}
                <Button type="submit" className="opacity">
                  Next
                </Button>
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
        <div className="theme-btn-container">
          {themes.map((theme: any) => {
            const style = {
              background: theme.background,
              marginBottom: "5px",
              cursor: "pointer",
              padding: "10px",
            };
            return (
              <span
                style={style}
                key={theme.background}
                onClick={() => handleThemeChange(theme.background)}
              >
                {theme.background}
              </span>
            );
          })}
        </div>
      </Box>
    </Box>
  );
};
