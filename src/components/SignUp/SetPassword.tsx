// SetPassword.js
import { Box, Button } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { ThemeButtons } from "../helpers/theme-buttons";
import { FormField } from "../helpers/form-field";
import { FormSubmit } from "../helpers/form-submit";
import { IoIosArrowBack } from "react-icons/io";

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

export const SetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");

  const handleSetPassword = async (values: any) => {
    try {
      const response = await fetch(
        "https://simple-chat-api-production.up.railway.app/api/auth/sign-up/set-password",
        {
          method: "POST",
          body: JSON.stringify({ email, password: values.password }),
        }
      );

      if (response.ok) {
        const data = response.json();
        navigate("/sign-in");
      } else {
        setShowError("No such user");
      }

      console.log("Подтверждение пароля выполнено успешно");
    } catch (error) {
      console.error("Ошибка при подтверждении пароля", error);
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
      <Link to="/" className="arrow-main">
        <IoIosArrowBack />
      </Link>
      <Box className="container">
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
              validationSchema={validationSchema}
              onSubmit={handleSetPassword}
            >
              <Form>
                <FormField
                  type="text"
                  name="usernamecode"
                  placeholder="Email"
                  value={email}
                />
                <FormField type="text" name="password" placeholder="Password" />
                <FormSubmit buttonText="Register" />
              </Form>
            </Formik>
          </div>
          <div className="circle circle-two"></div>
        </div>
        <ThemeButtons handleThemeChange={handleThemeChange} />
      </Box>
    </Box>
  );
};
