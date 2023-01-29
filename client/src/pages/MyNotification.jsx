import React from "react";
import axios from "axios";
import "./MyNotification.css";
import { useState, useEffect } from "react";

async function fetchNotifications(){
  const getToken = sessionStorage.getItem("token");
    const notifications = [];
     await axios.get('http://127.0.0.1:8000/api/notification/', {headers: {
      'Authorization': `Token ${getToken}`,
      },
    }).then(result => {
    console.log(result.data);
    result.data.forEach(notification => {
      notifications.push(notification);
    });
    })
    return notifications;
}


function MyNotification() {
  const [notifications, setNotification] = useState([]);
  
  useEffect(() => {
    fetchNotifications().then(result => setNotification(result));
  }, []);

  return (
    <div className="home">
      {/* <div className="sidebar">
        <LeftSide />
      </div>  */}
      <div className="homeContainer">
        <h1>Notifications</h1>
        <div className="notifications-container">
                {notifications?.map(notification => (
                    <div key={notification.title} className="notification-card">
                        <div className="left-side">
                            <img src = '/icons/red_icon_notification.png' className="document-icon"  width="5%" height="5%"/>
                        </div>
                        <div className="rightside">
                            <div className="notification-title">
                                Title: {notification.title}
                            </div> 
                            <div className="notification-message">
                                Message: {notification.body}
                            </div> 
                        </div>
                    </div>
                ))}
            </div>
      </div>
    </div>
  );
}

export default MyNotification;
