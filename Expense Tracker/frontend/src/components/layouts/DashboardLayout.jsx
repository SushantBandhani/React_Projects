import { UserContext } from "@/context/useContext"
import { useContext } from "react"
import Navbar from "./Navbar"
import SideMenu from "./SideMenu"

const DashboardLayout=({children,activeMenu})=>{
    const {user}=useContext(UserContext)
    // What if it takse sometime to load a skeleton would be good
    // if(!user) return <div>Loading...</div>
    return (
        <div className="">
            <Navbar activeMenu={activeMenu}></Navbar>
            {user &&(
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu}></SideMenu>
                    </div>

                <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout