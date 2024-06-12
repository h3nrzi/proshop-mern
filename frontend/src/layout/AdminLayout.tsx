import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return userInfo!.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
