import React from "react";
import "./MyDocuments.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function myDocuments() {
  return (
    <div className="home">
      {/* <HeaderBar />
      <div className="homeContainer">
        <div className="sidebar-container">
            <LeftSide />
        </div>  */}
      <div className="main-content">
        <h1>this is my documments page</h1>
      </div>
      {/* </div> */}
    </div>
  );
}

export default myDocuments;
