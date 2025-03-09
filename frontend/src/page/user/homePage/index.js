import React, { memo } from "react";
import "./style.scss";
import Slideshow from "../componet/Slideshow/Slideshow";
import Menu from "../componet/menu/menu";
import ProductList from "../componet/listSP/listsp";
import Design from "../componet/desgin/desgin";

const Homepage = () => {
  return (
    <>
    <div className="Menu">
        <Menu/>
    </div>
    
    <div className="img">
        <Slideshow/>
    </div>

    <div className="hr">
    </div>

    <div>
      <ProductList/>
    </div>
    <div>
      <Design/>
    </div>
    
    </>
  );
};

export default memo(Homepage);
