import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
import axios from "axios"
export const Users=()=>{
    const [users,setUsers]=useState([])
    const [filter,setFilter]=useState("")

    //deboucing
    useEffect(()=>{
            axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).then(response=>{
                setUsers(response.data.user)
            })
    },[filter])
return <>
    <div className="font-bold mt-6 text-lg">
        Users
    </div>
    <div className="w-full my-4 font-thin rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-2 py-1 rounded-md bg-white border-2 border-transparent focus:outline-none"
            style={{
              borderImage: "linear-gradient(to right, #6b46c1, #f56565, #fbd38d) 1",
            }}onChange={(e)=>{
              setFilter(e.target.value)
          }}
          />
        </div>
    <div>
        {users.map((user)=><User user={user}></User>)}
    </div>
</>
}

function User({user}) {
  const navigate=useNavigate()

    return (
      <div className="flex justify-between">
        <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl text-gray-950">
              {user.firstName[0]}
            </div>
          </div>
          <div className="flex flex-col justify-center h-full">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <Button label={"Send Money"} onClick={(e)=>{
            navigate("/send?id="+user._id+"&name="+user.firstName)
          }}/>
        </div>
      </div>
    );
  }
  