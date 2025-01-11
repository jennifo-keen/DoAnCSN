import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./page/user/homePage";
import MasterLayout from "./page/user/theme/masterLayout";
import SanPham from "./page/user/SanPham";

const renderUserRouter = () => {
    const  userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage/> 
        },
        {
            path: ROUTERS.USER.SANPHAM,
            component: <SanPham/> 
        }
    ];

    return (
        <MasterLayout>
        <Routes>
            {userRouters.map((item, key)=>(
                <Route key={key} path={item.path} element={item.component}/>
            ))}
        </Routes>
        </MasterLayout>
    )
}

const RouterCustom =()=>{
    return renderUserRouter();
};

export default RouterCustom;