import { Box, Button, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SignUp = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const handleFormSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        "https://simple-chat-api-production.up.railway.app/api/auth/sign-up/check-email",
        { email: values.username }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box className="login-page">
        <Typography variant="h6" component="div" className="login-page-title">
          Авторизация
        </Typography>
        <Formik
          initialValues={{
            username: "",
          }}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <div className="form-input form-username">
                <label htmlFor="username">Логин</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                Получить код
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
