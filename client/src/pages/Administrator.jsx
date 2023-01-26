import './Administrator.css';
import NavigationBar from '../components/navigationBar';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-notifications/lib/notifications.css';
import axios from "axios";

import { NotificationContainer, NotificationManager } from 'react-notifications';

class Notifications extends React.Component {
    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'accept':
                    NotificationManager.success('Info message');
                    break;
                case 'refuse':
                    NotificationManager.error('Success message');
                    break;
            }
        };
    };
};

async function getStudentList(){
    
    const getToken = sessionStorage.getItem("token");
    const students = [];
     await axios.get('http://127.0.0.1:8000/api/student/', {headers: {
      'Authorization': `Token ${getToken}`,
      },
    }).then(result => {
    console.log(result.data);
    result.data.forEach(student => {
        if(student.username != "superman")
            students.push(student);
    });
    })

    return students;

    
}

const Administrator = () => {
    const [students, setStudents] = useState([]);
  
    useEffect(() => {
      getStudentList().then(result => setStudents(result));
    }, []);

    return (
        <div className="admin-container">
            <NavigationBar />
            <h1>STUDENTS LIST:</h1>
            <hr/>
            <div className="user-container">
                {students?.map(user => (
                    <div key={user.username} className="user-card">
                        <div className="left-side">
                            <img src="/icons/user.png" className="user-icon" />
                        </div>
                        <div className="rightside">
                            <div className="user-name">
                                {user.last_name+","+user.first_name}
                                </div>
                                <a type="submit" href={`/administrator/submition/${user.username}`} className="role-button">Check submitions</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Administrator;