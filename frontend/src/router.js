import { Route, Routes } from "react-router-dom";
import HomePage from "./page/user/homePage";
import MasterLayout from "./page/user/theme/masterLayout";
import SanPham from "./page/user/SanPham";
import SignUp from "./page/user/Login-register/Signup";
import Login from "./page/user/Login-register/Login";
import SearchResults from "./componet/SearchResults/SearchResults";

const renderUserRouter = () => {
    return (
        <MasterLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:productId" element={<SanPham />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<SearchResults />} /> {/* Thêm route tìm kiếm */}
            </Routes>
        </MasterLayout>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;
