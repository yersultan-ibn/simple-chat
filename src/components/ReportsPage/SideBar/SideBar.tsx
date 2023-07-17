import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const SideBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authData"); // Удаляем только элемент "authData" из локального хранилища
  };

  return (
    <Box className="sidebar">
      <Typography variant="h6" component="h6">
        Demo application
      </Typography>

      <Box className="sidebar-btn sidebar-btn-active">Список отчётов</Box>
      <Box className="sidebar-btn">
        <Link to="/login" onClick={handleLogout}>Выход</Link> {/* Добавляем обработчик события onClick */}
      </Box>
    </Box>
  );
};
