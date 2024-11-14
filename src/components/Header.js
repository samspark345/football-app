import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="nav">
      <div className="logo">
        <img
          src={require("../images/logo.png")}
          alt=""
          className="headerLogo"
        ></img>
      </div>
      <div className="navbarItems">
        <NavLink end to="/myteams">
          {" "}
          My Teams{" "}
        </NavLink>
        <NavLink end to="/">
          {" "}
          Home{" "}
        </NavLink>
        <NavLink end to="/highlights">
          {" "}
          Highlights{" "}
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
