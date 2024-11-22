import { AppBar } from "../components/AppBar"
import { MessageComponent } from "../components/MessageComponent"
import { Users } from "../components/Users"

export const Dashboard=()=>{
    return <div>
    <AppBar></AppBar>
    <MessageComponent></MessageComponent>
    <div className="m-8">
    <Users></Users>
    </div>
    </div>
}