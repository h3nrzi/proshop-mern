import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../app/store";

const PrivateRoute = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
