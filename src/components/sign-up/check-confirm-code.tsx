import { Box, Button, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const CheckConfirmCode = () => {
  const navigate = useNavigate();
  const handleFormSubmit = async (values: any) => {
    try {
      const response = await fetch(
        "https://simple-chat-api-production.up.railway.app/api/auth/sign-up/check-confirm-code",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email, // Используем email вместо username
            code: values.code,
          }),
        }
      );

      // Обработка успешного ответа от сервера
      console.log(response);

      // Пример перенаправления пользователя на другую страницу после успешного запроса
      navigate("/set-password");
    } catch (error) {
      // Обработка ошибки
      console.error(error);
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
            email: "", // Изменили поле с username на email
            code: "",
          }}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <div className="form-input form-code">
                <label htmlFor="code">Код подтверждения</label>
                <Field type="text" id="code" name="code" />
                <ErrorMessage name="code" component="div" />
              </div>

              <Button type="submit">Подтвердить код</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
