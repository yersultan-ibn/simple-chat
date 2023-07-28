import React, { ReactNode } from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token") || Cookies.get("token");

  if (token) {
    return <>{children}</>;
  }

  return <Navigate to="/sign-in" />;
};
