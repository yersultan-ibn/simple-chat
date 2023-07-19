import { Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { ThemeButtons } from "../helpers/theme-buttons";
import { FormField } from "../helpers/form-field";
import { FormSubmit } from "../helpers/form-submit";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(3, "Code must have at least 3 characters")
    .required("Code is required"),
});

export const CheckConfirmCode = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("#231f20");

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
      console.log("Проверка кода подтверждения выполнена успешно");
    } catch (error) {
      console.error("Ошибка при проверке кода подтверждения", error);
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
              src="https://nambaone.app/_nuxt/img/business2.5140453.svg"
              alt="illustration"
              className="illustration"
            />
            <h1 className="opacity form-title">Confirm mail</h1>
            <Formik
              initialValues={{ code: "" }}
              validationSchema={validationSchema}
              onSubmit={checkConfirmationCode}
            >
              <Form>
                <FormField
                  name="usernamecode"
                  placeholder="Email"
                  readOnly
                  value={email}
                />
                <FormField name="code" placeholder="Code" />
                <FormSubmit buttonText="Next" />
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

export default CheckConfirmCode;
