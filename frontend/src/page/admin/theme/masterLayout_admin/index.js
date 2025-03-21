import {memo} from "react"
import Header from "../header";


const Adminlayout = ({children,...props}) => {
    return (
    <div {...props}>
        <Header/>
        {children}
    </div>
    );
};
export default memo(Adminlayout);