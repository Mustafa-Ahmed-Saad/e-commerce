import { useLocation } from "react-router-dom";
import { useContextMain } from "../../contexts/MainContext";
import ColorsPalette from "../colorsPalette/ColorsPalette";
import Login from "../pages/login/Login";
import MyToster from "../toster/MyToster";

export default function ProtectedRoute({ children }) {
  const { token } = useContextMain();

  let ui = <Login />;
  if (token) {
    ui = (
      <>
        <ColorsPalette />
        {children}
      </>
    );
  }
  return (
    <>
      {ui}
      <MyToster />
    </>
  );
}
