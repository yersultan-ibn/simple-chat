import { Box, Button, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
const validationSchema = Yup.object().shape({
  code: Yup.number()
    .min(3, "Code must be at least 3 characters")
    // .max(7, "Max 7")
    .required("Code is required"),
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

export const CheckConfirmCode = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");

  const checkConfirmationCode = async (values: any) => {
    try {
      const response = await fetch(
        "https://simple-chat-api-production.up.railway.app/api/auth/sign-up/check-confirm-code",
        {
          method: "POST",
          body: JSON.stringify({ email, code: values.code }),
        }
      );
      if (response.ok) {
        const data = response.json();
        navigate(`/set-password?email=${email}`);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.errorMessage;
        const leftTriesCount = errorData?.left_tries_count;
        const textError = `${errorMessage} ${leftTriesCount}`;
        setShowError(textError);
      }

      console.log("Confirmation code check successful");
    } catch (error) {
      console.error("Error checking confirmation code", error);
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
      <Link to="/check-email" className="arrow-main">
        <IoIosArrowBack />
      </Link>
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
            <h1 className="opacity form-title">Сonfirm mail</h1>
            <Formik
              initialValues={{ code: "" }}
              validationSchema={validationSchema}
              onSubmit={checkConfirmationCode}
            >
              <Form>
                <Field
                  type="text"
                  name="username"
                  placeholder="Email"
                  readOnly
                  value={email}
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="form-error"
                />
                <Field type="text" name="code" placeholder="Code" />
                <ErrorMessage
                  name="code"
                  component="p"
                  className="form-error"
                />
                <Button type="submit" className="opacity">
                  Next
                </Button>
              </Form>
            </Formik>
            {/* <div className="register-forget opacity">
              <a href="">REGISTER</a>
              <a href="">FORGOT PASSWORD</a>
            </div> */}
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
