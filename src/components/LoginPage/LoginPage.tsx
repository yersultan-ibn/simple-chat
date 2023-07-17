import { Box, Button, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Некорректный формат электронной почты")
    .min(6, "Логин должен содержать не менее 6 символов")
    .max(20, "Логин должен содержать не более 20 символов")
    .required("Требуется ввести логин"),
  password: Yup.string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .max(20, "Пароль должен содержать не более 20 символов")
    .required("Требуется ввести пароль"),
});

const users = [
  {
    username: "admin@gmail.com",
    password: "12345678",
  },
  {
    username: "user@gmail.com",
    password: "password123",
  },
  // Добавьте других пользователей с их учетными данными по мере необходимости
];

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (values: any) => {
    const matchingUser = users.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (matchingUser) {
      const authData = {
        username: values.username,
        loginTime: new Date().toString(),
      };
      localStorage.setItem("authData", JSON.stringify(authData));

      navigate("/");
    } else {
      alert("Неверные учетные данные");
    }
  };

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      const matchingUser = users.find(
        (user) => user.username === parsedAuthData.username
      );

      if (matchingUser) {
        console.log("Перенаправление на внутреннюю страницу...");
        navigate("/");
      }
    }
  }, []);

  return (
    <>
      <Box className="login-page">
        <Typography variant="h6" component="div" className="login-page-title">
          Авторизация
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <div className="form-input form-username">
                <label htmlFor="username">Логин</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" />
              </div>
              <div className="form-input form-password">
                <label htmlFor="password">Пароль</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Войти
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
