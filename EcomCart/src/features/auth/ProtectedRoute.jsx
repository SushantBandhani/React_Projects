import React from "react";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { authState,loggedInUserSelector} from "../../store/atom/list";

export const ProtectedRoute=({ children })=>{
  const user = useRecoilValue(loggedInUserSelector); // Get logged-in user state
  console.log("Inside protected route",user)

  if (user===null) {
    console.log("sdghddfjhf");
    // If user is not logged in, redirect to signup or login page
    // console.log("Hello")
    return <Navigate to="/signup" replace={true} />;
  }

  // If user is logged in, render the child component
  return children;
}
