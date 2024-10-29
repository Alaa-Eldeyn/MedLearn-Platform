import { getUser } from "../utils/LocalStorage";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = getUser();
  if (!token) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};

export default ProtectedRoute;
