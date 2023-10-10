import React from "react";
import { Offline } from "react-detect-offline";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import MainNavbar from "../navbar/Navbar";
import { useContextAuth } from "./../../contexts/AuthContext";

export default function Layout() {
  const { token } = useContextAuth();

  return (
    <>
      <MainNavbar />
      <Outlet />
      {token ? <Footer /> : null}

      {/* if offline */}
      <Offline>
        <div className="offline bg-danger rounded-3">
          <p className="mb-0">
            You're offline right now. Check your connection.
          </p>
        </div>
      </Offline>
    </>
  );
}
