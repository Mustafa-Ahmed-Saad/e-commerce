import { Navigate } from "react-router-dom";
import { useContextMain } from "../../contexts/MainContext";
import Login from "../pages/login/Login";

export default function ProtectedRoute({ children }) {
  const { token } = useContextMain();

  let ui = <Login />;
  if (token) {
    ui = children;
  }
  return ui;
}
