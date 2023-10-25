import React from "react";
import { Offline } from "react-detect-offline";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { useContextMain } from "../../contexts/MainContext";
import Footer from "../footer/Footer";
import MainNavbar from "../navbar/Navbar";

export default function Layout() {
  const { token } = useContextMain();

  return (
    <>
      <HelmetProvider>
        <MainNavbar />
        <div className="mt-5 pt-3">
          <Outlet />
        </div>
        {token ? <Footer /> : null}

        {/* if offline */}
        <Offline>
          <div className="offline bg-danger rounded-3">
            <p className="mb-0">
              You're offline right now. Check your connection.
            </p>
          </div>
        </Offline>
      </HelmetProvider>
    </>
  );
}
