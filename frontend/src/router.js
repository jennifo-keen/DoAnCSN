import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./page/user/contexts/CartContext";

import HomePage from "./page/user/homePage";
import MasterLayout from "./page/user/theme/masterLayout_user";
import SanPham from "./page/user/SanPham";
import SignUp from "./page/user/Login-register/Signup";
import Login from "./page/user/Login-register/Login";
import SearchResults from "./page/user/componet/SearchResults/SearchResults";
import Cart from "./page/user/GioHang/Cart";
import AdminLogin from "./page/admin/login-singup/loggin/AdminLogin";
import AdminRegister from "./page/admin/login-singup/Register/AdminRegister";
import Dashboard from "./page/admin/Dashboard/Dashboard";
import Adminlayout from "./page/admin/theme/masterLayout_admin";
import Profile from "./page/user/TrangCN";
import AdminSearchResults from "./page/admin/component/SearchResults/SearchResults";
import Payment from "./page/user/DonHang/payment";
import Order from "./page/user/DonHang/order";
import OrderList from "./page/admin/thongke/OrderList";
import ChangePassword from "./page/admin/component/ChangePassword/ChangePassword";
const RouterCustom = () => {
    return (
        <CartProvider>
            <Routes>
                {/* User Routes */}
                <Route path="/" element={<MasterLayout><HomePage /></MasterLayout>} />
                <Route path="/product/:productId" element={<MasterLayout><SanPham /></MasterLayout>} />
                <Route path="/signup" element={<MasterLayout><SignUp /></MasterLayout>} />
                <Route path="/login" element={<MasterLayout><Login /></MasterLayout>} />
                <Route path="/search" element={<MasterLayout><SearchResults /></MasterLayout>} />
                <Route path="/cart" element={<MasterLayout><Cart /></MasterLayout>} />
                <Route path="/personal" element={<MasterLayout><Profile/></MasterLayout>} />
                <Route path="/payment" element={<MasterLayout><Payment /></MasterLayout>} />
                <Route path="/order/:orderId" element={<MasterLayout><Order /></MasterLayout>} />


                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<Adminlayout><Dashboard /></Adminlayout>} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/search/admin" element={<Adminlayout><AdminSearchResults/> </Adminlayout>} />
                <Route path="/admin/orderlist" element={<Adminlayout><OrderList/> </Adminlayout>} />
                <Route path="/doimk" element={<Adminlayout><ChangePassword/> </Adminlayout>} />
            </Routes>
        </CartProvider>
    );
};

export default RouterCustom;
