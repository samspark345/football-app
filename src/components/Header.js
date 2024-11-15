import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = ({ signOutFunction }) => {
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
        <Button
          style={{ backgroundColor: "orange", color: "white" }}
          onClick={signOutFunction}
        >
          {" "}
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Header;
