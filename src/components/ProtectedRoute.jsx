import { getToken } from "../utils/LocalStorage";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};

export default ProtectedRoute;
