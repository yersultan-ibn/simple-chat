import React, { useEffect } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token") || Cookies.get("token");

  if (token) {
    return children;
  }

  return <Navigate to="/sign-in" />;
};
