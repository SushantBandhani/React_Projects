import React from "react";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { authState } from "../../store/atom/list";

export const ProtectedRoute=({ children })=>{
  const user = useRecoilValue(authState); // Get logged-in user state

  if (!user) {
    // If user is not logged in, redirect to signup or login page
    console.log("Hello")
    return <Navigate to="/signup" replace={true} />;
  }

  // If user is logged in, render the child component
  return children;
}
