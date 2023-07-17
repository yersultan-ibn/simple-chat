import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginPage } from "../LoginPage/LoginPage"; // Замените на фактический импорт компонента LoginPage
import { ReportsPage } from "../ReportsPage/ReportsPage"; // Замените на фактический импорт компонента ReportsPage

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
//   console.log(isAuthenticated);
  const navigate = useNavigate();
  return (
    <Route
      {...rest}
      render={(props: any) =>
        isAuthenticated ? <Component {...props} /> : navigate(`/login`)
      }
    />
  );
};

export default PrivateRoute;
