import { Route, Routes } from "react-router-dom";
import HomePage from "./page/user/homePage";
import MasterLayout from "./page/user/theme/masterLayout_user";
import SanPham from "./page/user/SanPham";
import SignUp from "./page/user/Login-register/Signup";
import Login from "./page/user/Login-register/Login";
import SearchResults from "./page/user/componet/SearchResults/SearchResults";
import Cart from "./page/user/GioHang/Cart";
import { CartProvider } from "./page/user/contexts/CartContext";
import AdminLogin from "./page/admin/login-singup/loggin/AdminLogin";
import AdminRegister from "./page/admin/login-singup/Register/AdminRegister";
import Dashboard from "./page/admin/Dashboard/Dashboard";

const RouterCustom = () => {
    return (
        <CartProvider>
            <Routes>
                {/* User Routes - CÓ Header/Footer */}
                <Route path="/" element={<MasterLayout><HomePage /></MasterLayout>} />
                <Route path="/product/:productId" element={<MasterLayout><SanPham /></MasterLayout>} />
                <Route path="/signup" element={<MasterLayout><SignUp /></MasterLayout>} />
                <Route path="/login" element={<MasterLayout><Login /></MasterLayout>} />
                <Route path="/search" element={<MasterLayout><SearchResults /></MasterLayout>} />
                <Route path="/cart" element={<MasterLayout><Cart /></MasterLayout>} />

                {/* Admin Routes - KHÔNG CÓ Header/Footer */}
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
            </Routes>
        </CartProvider>
    );
};

export default RouterCustom;
