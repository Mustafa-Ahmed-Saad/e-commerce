import React, { useEffect } from "react";
import { Offline } from "react-detect-offline";
import { HelmetProvider } from "react-helmet-async";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { useContextMain } from "../../contexts/MainContext";
import Footer from "../footer/Footer";
import MainNavbar from "../navbar/Navbar";

export default function Layout() {
  const { token } = useContextMain();
  const action = useNavigationType();
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);

    // if (action !== "POP") {
    //   setTimeout(() => {
    //     window.scrollTo(0, 0);
    //   }, 5000);
    // }
  }, [action, pathname]);

  // we don't need  this because we use (react helmet async)
  // useEffect(() => {
  //   let title = "";
  //   let metaDescription = "";

  //   switch (pathname) {
  //     case "/":
  //     case "/home":
  //       title = "title";
  //       metaDescription = "Description";
  //       break;

  //     case "/cart":
  //       title = "title";
  //       metaDescription = "Description";
  //       break;

  //     case "/wishList":
  //       title = "title";
  //       metaDescription = "Description";
  //       break;

  //     case "/Products":
  //       title = "title";
  //       metaDescription = "Description";
  //       break;

  //     case "/categories":
  //       title = "title";
  //       metaDescription = "Description";
  //       break;

  //     case "/brands":
  //       title = "title";
  //       metaDescription = "Description";
  //       break;

  //     case "/allorders":
  //       title = "title";
  //       metaDescription = "Description";
  //       break;

  //     default:
  //   }

  //   if (title) {
  //     document.title = title;
  //   }

  //   if (metaDescription) {
  //     const metaDescriptionTag = document.querySelector(
  //       'head > meta[name="description"]'
  //     );
  //     if (metaDescriptionTag) {
  //       metaDescriptionTag.content = metaDescription;
  //     }
  //   }
  // }, [pathname]);

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
