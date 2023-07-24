import React, { useEffect } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { makeWebSocketRequest } from "../sockets/MakeWebSocketRequest";

export const PrivateRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || Cookies.get("token");
  useEffect(() => {
    if (token) {
      makeWebSocketRequest(token)
        .then((response) => {
          console.log("Успешный ответ от WebSocket:", response);

          // В данный момент просто выводим ответ в консоль и продолжаем рендерить дочерний компонент (dashboard)
        })
        .catch((error) => {
          console.error("Ошибка WebSocket запроса:", error);
          navigate("/sign-in");
        });
    }
  }, [token]);

  if (token) {
    return children;
  }

  // Если у пользователя нет действительного токена, перенаправляем на страницу входа
  return <Navigate to="/sign-in" />;
};
