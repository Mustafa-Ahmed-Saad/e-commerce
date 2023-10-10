import { Navigate } from "react-router-dom";
import { useContextAuth } from "./../../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContextAuth();

  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
