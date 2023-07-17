import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { SideBar } from "./SideBar/SideBar";
import { TopReport } from "./TopReport/TopReport";
import { Reports } from "./Reports/Reports";
import { useNavigate } from "react-router-dom";

export const ReportsPage = () => {
  const navigate = useNavigate();
  const authData = localStorage.getItem("authData");

  useEffect(() => {
    if (!authData) {
      navigate("/login"); // Перенаправление на страницу авторизации, если нет данных об авторизации
    }
  }, [authData, navigate]);

  return (
    <Box>
      <Box className="reports-page">
        <SideBar />
        <Box className="reports-main">
          <TopReport />
          <Reports />
        </Box>
      </Box>
    </Box>
  );
};
