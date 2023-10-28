import { useContextMain } from "../../contexts/MainContext";
import ColorsPalette from "../colorsPalette/ColorsPalette";
import Login from "../pages/login/Login";
import MyToster from "../toster/MyToster";
import WOW from "wow.js";

export default function ProtectedRoute({ children }) {
  const { token } = useContextMain();

  let ui = <Login />;
  if (token) {
    new WOW().init();
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
