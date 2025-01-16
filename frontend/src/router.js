import { Route, Routes } from "react-router-dom";
import HomePage from "./page/user/homePage";
import MasterLayout from "./page/user/theme/masterLayout";
import SanPham from "./page/user/SanPham";

const renderUserRouter = () => {

    return (
        <MasterLayout>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<SanPham />} />
        </Routes>
        </MasterLayout>
    )
}

const RouterCustom =()=>{
    return renderUserRouter();
};

export default RouterCustom;