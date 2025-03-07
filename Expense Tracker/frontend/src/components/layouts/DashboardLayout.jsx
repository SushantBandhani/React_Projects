import { UserContext } from "@/context/useContext"
import { useContext } from "react"
import Navbar from "./Navbar"
import SideMenu from "./SideMenu"

const DashboardLayout=({children,activeMenu})=>{
    const {user}=useContext(UserContext)
    console.log(user)
    return (
        <div className="">
            <Navbar activeMenu={activeMenu}></Navbar>
            {user &&(
                <div className="flex">
                    <div className="">
                        <SideMenu activeMenu={activeMenu}></SideMenu>
                    </div>

                <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout