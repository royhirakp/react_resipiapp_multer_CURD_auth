import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

import LocalDiningIcon from "@mui/icons-material/LocalDining";
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
const Header = () => {
  const navgate = useNavigate();
  function LogOut() {
    localStorage.removeItem("logToken");
    navgate("/"); //
  }
  return (
    <div className="headerContainer">
      <a
        href="/home"
        style={{
          backgroundColor: "#3e7bb1",
          padding: "12px",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          gap: "7px",
          color: "#ffff",
          textDecoration: "none",
        }}
        className="logobutton"
      >
        <LocalDiningIcon /> Recipe App
      </a>

      <button onClick={() => LogOut()}>logout</button>
    </div>
  );
};

export default Header;
