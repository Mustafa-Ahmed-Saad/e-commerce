import React from "react";
import {
  faCartShopping,
  faBars,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Cookies from "js-cookie";
import { useContextMain } from "../../contexts/MainContext";

export default function MainNavbar() {
  const { productsCounter } = useContextMain();
  const { token, setToken } = useContextMain();

  function handelLogOut() {
    Cookies.remove("token");
    setToken(false);
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <div>
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-main fa-2x me-2"
          />
          <NavLink className="navbar-brand fw-bold fs-2" to="#">
            fresh cart
          </NavLink>
        </div>

        {/* toggle btn */}
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FontAwesomeIcon icon={faBars} className="text-main" />
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
                <div className="d-flex flex-sm-column flex-lg-row">
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
                      {productsCounter}
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
      </Container>
    </Navbar>
  );
}
