import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);

  return userInfo ? <Outlet/> : <Navigate to="/" replace/>;
};

export default PrivateRoute;
