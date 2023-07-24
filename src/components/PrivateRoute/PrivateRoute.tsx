import Cookies from "js-cookie";
import React from "react";
import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token") || Cookies.get("token");

  if (token) {
    return children;
  }

  return <Navigate to="/check-email" />;
};
