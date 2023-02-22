import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SidebarComponent from '../../components/Sidebar.component'
function AuthGuard() {
  const { user } = useSelector((state) => state.auth);
  return user ? <> <SidebarComponent /><Outlet /> </> : <Navigate to="/login" />;
}

export default AuthGuard;
