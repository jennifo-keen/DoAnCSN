import { Route, Routes } from "react-router-dom";
import HomePage from "./page/user/homePage";
import MasterLayout from "./page/user/theme/masterLayout";
import SanPham from "./page/user/SanPham";
import SignUp from "./page/user/Login-register/Signup";
import Login from "./page/user/Login-register/Login";
import SearchResults from "./componet/SearchResults/SearchResults";
import Cart from "./page/user/GioHang/Cart";
import { CartProvider } from "./contexts/CartContext";
import AdminLogin from "./page/admin/login-singup/AdminLogin";
import AdminRegister from "./page/admin/login-singup/AdminRegister";

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
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
            </Routes>
        </CartProvider>
    );
};

export default RouterCustom;
