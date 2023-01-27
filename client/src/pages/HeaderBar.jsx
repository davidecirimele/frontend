import { AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import colorConfigs from "../configs/colorConfigs";
import sizeConfigs from "../configs/sizeConfigs";
import { useState } from "react";
import "./HeaderBar.css"

const HeaderBar = () => {
  const [currentAction, setCurrentAction] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const Enroll = () => {
    setCurrentAction("Enroll");
    console.log("Enrolling...");
  };

  const ApplyTest = () => {
    setCurrentAction("ApplyTest");
    console.log("Applying for test...");
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const handleLogout = () => {
    localStorage.removeItem("studentLoginStatus");
    window.location.href = "/";
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Toolbar>
        {/* <Typography variant="h6">React sidebar with dropdown</Typography> */}
        <div className="header">
          <div className="header-left">
            <button onClick={Enroll}>Enroll</button>
            <button className="link-btn">
              Apply now <NavLink to="/mbp">click here</NavLink>
            </button>
            <button onClick={ApplyTest}>Apply Test</button>

            <button onClick={() => handleLanguageChange("English")}>
              English
            </button>
            <button onClick={() => handleLanguageChange("Italian")}>
              Italian
            </button>
          </div>
          <div className="header-right">
            {/* <NavLink to="/myProfile">My Profile</NavLink> */}
            <button type="submit" onClick={handleLogout}>
              Log out
            </button>
          </div>

          {/* <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/MyDocuments" element={<myDocuments />} />
        <Route path="/MyNotification" element={<myNotification />} /> */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
