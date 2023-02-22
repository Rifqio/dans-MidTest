import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
function UnauthenticatedGuard() {
  const { user } = useSelector((state) => state.auth);
  return !user ? <Outlet /> : <Navigate to="/" />;
}

export default UnauthenticatedGuard;
