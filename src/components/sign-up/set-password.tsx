import { Box, Button, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const validationSchema = Yup.object().shape({
  password: Yup.number()
    .min(3, "Code must be at least 3 characters")
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

export const SetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState("");

  const handleSetPassword = async (values: any) => {
    try {
      const response = await fetch(
        "https://simple-chat-api-production.up.railway.app/api/auth/sign-up/set-password",
        {
          method: "POST",
          body: JSON.stringify({ email: email, password: values.password }),
        }
      );
      if (response.ok) {
        const data = response.json();
        navigate("/sign-in");
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
      <Box className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>
          <div className="form-container">
            <img
              src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
              alt="illustration"
              className="illustration"
            />
            <h1 className="opacity form-title">Sign up</h1>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSetPassword}
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
                <Field type="text" name="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="form-error"
                />
                <Button type="submit" className="opacity">
                  Register
                </Button>
              </Form>
            </Formik>
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
