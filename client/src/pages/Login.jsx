import './Login.css';
import NavigationBar from '../components/navigationBar';
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-notifications/lib/notifications.css';
import { useNavigate } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/auth/login/'

const headers = {
  "Content-Type": "application/json"
};

function StudentLogin() {

  const [studentLoginData, setstudentLoginData] = useState({
    'username': "",
    'password': ""
  });

  const handleChange = (event) => {
    setstudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value
    });
  }

  const submitForm = async () => {
    const studentFormData = new FormData;
    studentFormData.append('username', studentLoginData.username)
    studentFormData.append('password', studentLoginData.password)
    try{
      const response = await axios.post(baseUrl, studentFormData, {headers: headers});
      console.log(response)
      sessionStorage.setItem("token", response.data.key);
      sessionStorage.setItem("isLoggedIn", true);
      console.log(sessionStorage.getItem("token"))
      window.location.href = '/dashboard';
    }catch (error) {
      console.log(error);
 
    }
  }


  useEffect(() => {
    document.title = 'Student Login'
  });


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <NavigationBar />
      <div className="home-container">
        <div className="title">
          <img src="/icons/form.png" alt="form-icon" className="form-icon" />
          <div className="title-white">Attempt to</div>
          <div className="title-blue"> Universita Della Calabria</div>
        </div>
        <div className="card-container">
          <div className="card" id="login">
            <div className="card-header">
              LOGIN
            </div>
            <hr className="line" />
            <form className="form-personal-data" onSubmit={console.log("submited")}>
              <div className="field-container">
              <input onChange={handleChange} type="text" placeholder="username" value={studentLoginData.username} name="username" />
              </div>
              <div className="field-container">
              <input onChange={handleChange} type="password" placeholder="password" value={studentLoginData.password} name="password" />
              </div>
              <div className="button-container">

                <Button
                sx={{backgroundColor:"#EEEEEE",color:"#2A2A2A"}}
                 size="small"
                 type="button" 
                 onClick={submitForm}
                 >Sign In</Button>
              </div>
              <button className="link-btn" >Don't have an account? <NavLink to="/register">Register here.</NavLink></button>
            </form>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default StudentLogin;
