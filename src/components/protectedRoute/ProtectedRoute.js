import { Navigate, useLocation } from "react-router-dom";
import { useContextMain } from "../../contexts/MainContext";
import Login from "../pages/login/Login";

export default function ProtectedRoute({ children }) {
  const { token } = useContextMain();
  const { state } = useLocation();

  console.log("statefrom protect", state);

  let ui = <Login />;
  if (token) {
    ui = children;
  }
  return ui;
}
