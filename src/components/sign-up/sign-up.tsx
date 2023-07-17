import { Box, Button, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email format")
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
});

export const SignUp = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);

  const [showUsername, setShowUsername] = useState(true);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const checkEmailAvailability = async (email: any) => {
    try {
      const response = await fetch(
        "https://simple-chat-api-production.up.railway.app/api/auth/sign-up/check-email",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      console.log("Email availability check successful");

      setValue("");
      setShowCodeInput(true);
      setShowUsername(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error checking email availability", error);
      setErrorMessage("Error checking email availability");
    }
  };

  const checkConfirmationCode = async (email: any, code: any) => {
    const response = await fetch(
      "https://simple-chat-api-production.up.railway.app/api/auth/sign-up/check-confirm-code",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      }
    );
    setShowConfirmation(false);
    setShowPassword(true);
    console.log("ibunku ibunkuuu");
  };

  const handleFormSubmit = async (values: any) => {
    if (showCodeInput) {
      await checkConfirmationCode(values.username, values.code);
    } else {
      checkEmailAvailability(values.username);
    }
  };

  const setPassword = async (email: any, password: any) => {
    try {
      const response = await fetch(
        "https://simple-chat-api-production.up.railway.app/api/auth/sign-up/set-password",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      console.log("Password set successfully");
      // Дополнительные действия после успешного установления пароля
    } catch (error) {
      console.error("Error setting password", error);
      // Обработка ошибки при установке пароля
    }
  };

  return (
    <>
      <Box className="login-page">
        <Typography variant="h6" component="div" className="login-page-title">
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            username: "",
            code: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              {showUsername && (
                <div className="form-input form-username">
                  <label htmlFor="username">Username</label>
                  <Field type="text" id="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </div>
              )}
              {showConfirmation && (
                <div className="form-input form-code">
                  <label htmlFor="code">Confirmation Code</label>
                  <Field type="text" id="code" name="code" />
                  <ErrorMessage name="code" component="div" />
                </div>
              )}

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              {showPassword ? <SetPassword setPassword={setPassword} /> : ""}
              {showConfirmation && <Button type="submit">Get Code</Button>}
              {showUsername && <Button type="submit">Next</Button>}
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

const SetPassword = ({ setPassword }: any) => {
  const handleFormSubmit = async (values: any) => {
    await setPassword(values.email, values.password);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={handleFormSubmit}
    >
      <div>
        <div className="form-input form-email">
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div className="form-input form-password">
          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <Button type="submit">Set Password</Button>
      </div>
    </Formik>
  );
};
