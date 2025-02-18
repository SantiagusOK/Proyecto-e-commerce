import { Outlet } from "react-router-dom";
import MyNavBar from "../components/NavBar";

export default function(){
    return(
        <div>
            <MyNavBar/>
            <Outlet/>
        </div>
    )
}