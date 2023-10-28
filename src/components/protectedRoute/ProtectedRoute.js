import { useEffect } from "react";
import { useContextMain } from "../../contexts/MainContext";
import ColorsPalette from "../colorsPalette/ColorsPalette";
import Login from "../pages/login/Login";
import MyToster from "../toster/MyToster";
import WOW from "wow.js";

export default function ProtectedRoute({ children }) {
  const { token } = useContextMain();

  useEffect(() => {
    new WOW().init();
  }, []);

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
