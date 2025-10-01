import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../auth/authSlice";
import { useSelector } from "react-redux";

export const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  console.log(children,user)

  if (children === undefined) {
    // You can return fallback content if children are not provided
    return <div>No content available</div>;
  }
  if (user && user?.role !== 'admin') {
    return <Navigate to="/" replace={true} />;
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;

};