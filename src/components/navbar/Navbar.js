import "./Navbar.css";

import React, { useEffect, useState } from "react";
import { faCartShopping, faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Cookies from "js-cookie";
import { useContextMain } from "../../contexts/MainContext";
import ToggleModeCheck from "../toggleModeCheck/ToggleModeCheck";
import { useRef } from "react";

export default function MainNavbar() {
  const { token, setToken, productsCounter, mode, setMode, mainColor } =
    useContextMain();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const inputRef = useRef(); // Step 1: Create a ref

  function handelLogOut() {
    Cookies.remove("token");
    setToken(false);
    localStorage.clear();
  }

  function toggleMode(isChicked) {
    const htmlTag = document.documentElement;

    if (isChicked) {
      // isChecked = true = dark
      htmlTag.setAttribute("data-bs-theme", "dark");
      setMode("dark");
    } else {
      // isChecked = false = light
      htmlTag.setAttribute("data-bs-theme", "light");
      setMode("light");
    }
  }

  let scrollOffset = 0;
  const handleScroll = (e) => {
    if (scrollOffset > window.pageYOffset) {
      // remove class scroll up
      setIsScrollDown(false);
    } else {
      // add class scroll down
      setIsScrollDown(true);
    }
    scrollOffset = window.pageYOffset;

    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    if (mode) {
      if (mode === "light") {
        // set mode light = false
        if (inputRef.current.checked === true) {
          inputRef.current.checked = false;
        }
        toggleMode(false);
      } else {
        // set mode dark = true
        if (inputRef.current.checked === false) {
          inputRef.current.checked = true;
        }
        toggleMode(true);
      }
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // dark = true;
        inputRef.current.checked = true;
        toggleMode(true);
      } else {
        // light = false
        inputRef.current.checked = false;
        toggleMode(false);
      }
    }

    if (mainColor) {
      // change value of mainColor variable in html tag
      document.documentElement.style.setProperty("--main-color", mainColor);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="xl"
      className={`main-navbar bg-body-tertiary position-fixed w-100 top-0 z-2 ${
        isScrolled ? "scrolled" : ""
      } ${isScrollDown ? "top-n65" : ""}`}
    >
      <Container>
        {/* logo */}
        <div>
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-main fa-2x me-2"
          />
          <NavLink className="navbar-brand fw-bold fs-2" to="/home">
            fresh cart
          </NavLink>
        </div>

        {/* toggle mode and collapce icon*/}
        <div className="mode-check-container ms-auto me-2 ms-xl-3 d-block d-xl-none">
          <ToggleModeCheck toggleMode={toggleMode} inputRef={inputRef} />
        </div>
        {/* toggle btn */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faX} className="text-main" />
          ) : (
            <FontAwesomeIcon icon={faBars} className="text-main" />
          )}
        </Navbar.Toggle>

        {/* Collapse */}
        <Navbar.Collapse id="basic-navbar-nav">
          {token ? (
            <>
              <Nav className="align-items-sm-start align-items-lg-center m-auto">
                {/* // home */}
                <NavLink
                  className="nav-link fw-bold me-2"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </NavLink>
                {/* // cart */}
                <NavLink
                  className="nav-link fw-bold me-2"
                  aria-current="page"
                  to="/cart"
                >
                  cart
                </NavLink>
                {/* //  wish list */}
                <NavLink
                  className="nav-link fw-bold me-2"
                  aria-current="page"
                  to="/wishList"
                >
                  wish list
                </NavLink>
                {/* // Products */}
                <NavLink
                  className="nav-link fw-bold me-2"
                  aria-current="page"
                  to="/products"
                >
                  Products
                </NavLink>
                {/* // categories */}
                <NavLink
                  className="nav-link fw-bold me-2"
                  aria-current="page"
                  to="/categories"
                >
                  categories
                </NavLink>
                {/* brands */}
                <NavLink
                  className="nav-link fw-bold me-2"
                  aria-current="page"
                  to="/brands"
                >
                  brands
                </NavLink>
                {/* my orders */}
                <NavLink
                  className="nav-link fw-bold me-2"
                  aria-current="page"
                  to="/allorders"
                >
                  my orders
                </NavLink>
              </Nav>
              <Nav className="align-items-center">
                <div className="d-flex flex-column flex-lg-row align-items-center">
                  {/* // cart icon */}
                  <NavLink
                    className="nav-link fw-bold position-relative mb-sm-4 mb-lg-0 me-2 "
                    aria-current="page"
                    to="/cart"
                  >
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-secondary fa-xl me-1"
                    />
                    <Badge
                      bg="main"
                      className="position-absolute start-75 translate-middle badge rounded-pill"
                    >
                      {productsCounter >= 0 ? productsCounter : 0}
                    </Badge>
                  </NavLink>
                  {/* // logout */}
                  <NavLink
                    className="nav-link fw-bold"
                    aria-current="page"
                    to="/login"
                    onClick={handelLogOut}
                  >
                    log out
                  </NavLink>
                </div>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="align-items-center ms-auto">
                {/* //  register */}
                <NavLink
                  className="nav-link fw-bold me-2"
                  aria-current="page"
                  to="/register"
                >
                  register
                </NavLink>
                {/* // login */}
                <NavLink
                  className="nav-link fw-bold"
                  aria-current="page"
                  to="/login"
                >
                  log in
                </NavLink>
              </Nav>
            </>
          )}
        </Navbar.Collapse>

        <div className="mode-check-container ms-auto me-2 ms-xl-3 d-none d-xl-block">
          <ToggleModeCheck toggleMode={toggleMode} inputRef={inputRef} />
          {/* <Toggle
                  checked={isDark}
                  onChange={({ target }) => toggleMode(target.checked)}
                  icons={{ checked: "🌙", unchecked: "🔆" }}
                  aria-label="Dark mode toggle"
                /> */}
        </div>
      </Container>
    </Navbar>
  );
}
