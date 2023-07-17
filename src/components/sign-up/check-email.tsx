import { Box, Button, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email format")
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .test({
      name: "email",
      test: (value, context) => {
        if (context.parent.showPassword) {
          return value !== undefined && value.trim() !== "";
        }
        return true;
      },
      message: "Email is required",
    }),
  password: Yup.string().test({
    name: "password",
    test: (value, context) => {
      if (context.parent.showPassword) {
        return value !== undefined && value.trim() !== "";
      }
      return true;
    },
    message: "Password is required",
  }),
});

export const SignUp = () => {
  const [value, setValue] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showUsername, setShowUsername] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    try {
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
    } catch (error) {
      console.error("Error verifying confirmation code", error);
      setErrorMessage(
        "Error verifying confirmation code. Please make sure you entered the correct code."
      );
    }
  };

  const handleFormSubmit = async (values: any) => {
    if (showCodeInput) {
      await checkConfirmationCode(values.username, values.code);
    } else if (showPassword) {
      // Make the POST request to set the password
      const { email, password } = values;
      try {
        const response = await fetch(
          "https://simple-chat-api-production.up.railway.app/api/auth/sign-up/set-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (response.status === 200) {
          // Handle successful password setting
          console.log("Password set successfully");
        } else {
          throw new Error("Failed to set password");
        }
      } catch (error) {
        console.error("Error setting password", error);
        setErrorMessage("Error setting password");
      }
    } else {
      checkEmailAvailability(values.username);
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
              {showPassword && (
                <div className="form-input form-email">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
              )}
              {showPassword && (
                <div className="form-input form-password">
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </div>
              )}

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              {showCodeInput ? (
                <Button type="submit">Next</Button>
              ) : (
                <Button type="submit">Get Code</Button>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
