import { RecoilRoot } from "recoil";
import Signup from "../features/components/Signup";

export default function SignupPage(){
return (
    <div>
        <RecoilRoot>
        <Signup></Signup>
        </RecoilRoot>
    </div>
)
}