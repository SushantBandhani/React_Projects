import { SignupInput } from "@sushant398/medium-back";
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config";


export const Auth=({type}:{type:"signup" | "signin"})=>{
    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
    });

    const navigate=useNavigate();

   async function sendRequest(){
    try{
        // In case of signin Zod will ignore extra name field,because that is optional in Zod object
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
        const jwt=response.data;
        console.log(jwt.jwt)
        localStorage.setItem("token",jwt.jwt);
        console.log(postInputs)
        navigate("/blogs")
    }
    catch(e){
        alert("Error while signin")
        console.log(e)
    }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
            <div className="text-3xl font-extra-bold">
            Create an account
            </div>
            <div className="text-slate-400"> {type=="signin"?"Don't have an account":"Already have an account"} 
                <Link  className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>
                {type==="signin"?"Sign up":"Sign in"} 
                </Link> 
            </div>
        </div>
        <div className="pt-4">
        {type==="signup"?<LabelledInput label="Name" placeholder="Enter username" onChange={(e)=>{
            setPostInputs({
                ...postInputs,name:e.target.value
            })
        }} ></LabelledInput>:null}
        <LabelledInput label="Email address" placeholder="Enter email" onChange={(e)=>{
            setPostInputs({
                ...postInputs,email:e.target.value
            })
        }} ></LabelledInput>
        <LabelledInput label="Password" type="password" placeholder="Enter password" onChange={(e)=>{
            setPostInputs({
                ...postInputs,password:e.target.value
            })
        }} ></LabelledInput>
            <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=='signup'?"Sign up":"Sign in"}</button>

        </div>
        </div>
        </div>
    </div>
}


type SomeType={
    label: string;
    placeholder: string;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
    type?:string
};
  

function LabelledInput({label,placeholder,onChange,type}:SomeType){
    return   <div>
    <label className="block mb-2 text-sm font-medium text-black text-bold font-semibold pt-4">{label}</label>
    <input onChange={onChange} type={type || 'text'} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />

</div>

}