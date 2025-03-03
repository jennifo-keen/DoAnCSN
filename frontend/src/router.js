import { Route, Routes } from "react-router-dom";
import HomePage from "./page/user/homePage";
import MasterLayout from "./page/user/theme/masterLayout";
import SanPham from "./page/user/SanPham";
import SignUp from "./page/user/Login-register/Signup";
import Login from "./page/user/Login-register/Login";
import SearchResults from "./componet/SearchResults/SearchResults";
import Cart from "./page/user/GioHang/Cart";
import { CartProvider } from "./utils/CartContext";

const renderUserRouter = () => {
    return (
        <CartProvider>
            <MasterLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:productId" element={<SanPham />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/cart" element={<Cart />} /> {/* Thêm route cho giỏ hàng */}
                </Routes>
            </MasterLayout>
        </CartProvider>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;
