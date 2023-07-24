import { Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { ThemeButtons } from "../helpers/theme-buttons";
import { FormField } from "../helpers/form-field";
import { FormSubmit } from "../helpers/form-submit";
import { RequestMethodsEnum, makeRequest } from "../../tools/request";

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
      const data = await makeRequest({
        url: "auth/sign-up/check-confirm-code",
        body: JSON.stringify({ email, code: values.code }),
        method: RequestMethodsEnum.POST,
      });

      console.log(data);

      navigate(`/set-password?email=${email}`);
    } catch (error: any) {
      const errorMessage = error.message; // Use error.message directly
      const leftTriesCount = error.data?.leftTriesCount; // Use error.data?.leftTriesCount
      const textError = `${errorMessage} ${
        leftTriesCount !== undefined ? leftTriesCount : ""
      }`;
      setShowError(textError);
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
      <Link to="/" className="arrow-main">
        <IoIosArrowBack />
      </Link>
      <Box className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>
          <div className="form-error form-error-top">{showError}</div>
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
