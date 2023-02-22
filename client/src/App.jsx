import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login.page";
import RegisterPage from "./pages/auth/Register.page";
import DashboardPage from "./pages/user/Dashboard.page";
import ProductPage from "./pages/user/Product.page";
import SidebarComponent from "./components/Sidebar.component";
import ProductDetail from "./pages/user/ProductDetail.page";
import AuthGuard from "./pages/guard/AuthGuard";
import UnauthenticatedGuard from "./pages/guard/UnauthenticatedGuard";

function App() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>
      <Route element={<UnauthenticatedGuard />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
