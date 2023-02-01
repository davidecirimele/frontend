import { AppBar } from "@mui/material";
import { NavLink } from "react-router-dom";
import colorConfigs from "../configs/colorConfigs";
import sizeConfigs from "../configs/sizeConfigs";
import "./HeaderBar.css";
import DegreeDocument from "../components/DegreeDocument";
import EnrollStudent from "../components/EnrollStudent";
import InsertDocument from "../components/InsertDocument";
import { useState, useEffect } from "react";
import axios from "axios";



const HeaderBar = () => {

  const [enrolledstudent, setStudent] = useState({
    id_number : "",
    student : "",
    department : "",
    course : "",
    degree_grade : "",
  });
  

  useEffect(() => {
    const getToken = sessionStorage.getItem("token");
    axios.get('http://127.0.0.1:8000/api/student_enrolled/', {headers: {
      'Authorization': `Token ${getToken}`,
      },
    }).then(result => {
      console.log(result.data);
      setStudent(result.data[0]);
    })
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("studentLoginStatus");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  
  if(enrolledstudent?.student.username != sessionStorage.getItem("username"))
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          paddingY: 1,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          ml: sizeConfigs.sidebar.width,
          boxShadow: "unset",
          backgroundColor: colorConfigs.topbar.bg,
          color: colorConfigs.topbar.color,
          height: 60,
        }}
      >
        <div className="header">
          <div className="header-left">
            <EnrollStudent>Enroll</EnrollStudent>
            <DegreeDocument>Apply Test</DegreeDocument>
          </div>

          <div className="header-right">
            <button type="submit" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </AppBar>
    </>
  );
  else
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          paddingY: 1,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          ml: sizeConfigs.sidebar.width,
          boxShadow: "unset",
          backgroundColor: colorConfigs.topbar.bg,
          color: colorConfigs.topbar.color,
          height: 60,
        }}
      >
        <div className="header">
          <div className="header-left">
            <InsertDocument>Insert ID Document</InsertDocument>
          </div>

          <div className="header-right">
            <button type="submit" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </AppBar>
    </>
  );
};

export default HeaderBar;
