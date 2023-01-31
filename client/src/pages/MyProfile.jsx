import React from "react";
import "./MyProfile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Password } from "@mui/icons-material";



async function fetchProfileInfo(){
  console.log("fetching")
  const getToken = sessionStorage.getItem("token");
  const student = [];
     await axios.get('http://127.0.0.1:8000/api/student/',{headers: {
      'Authorization': `Token ${getToken}`,
      },
    }).then(result => {
          student.push(result.data);
          console.log(student);
    })
    console.log(student[0][0])
    return student[0][0];
}

async function fetchBookedTests(){
  const getToken = sessionStorage.getItem("token");
    const bookedtests = [];

     await axios.get('http://127.0.0.1:8000/api/booked_test/', {headers: {
      'Authorization': `Token ${getToken}`,
      },
    }).then(result => {
    console.log(result.data);
    result.data.forEach(test => {
      bookedtests.push(test);
    });
    })
    console.log(bookedtests)
    return bookedtests
}

const MyProfile = ()=> {
  const [student, setStudent] = useState(null);
  const [bookedtests, setBookedTests] = useState([]);

  
  useEffect(() => {
    fetchProfileInfo().then(result => setStudent(result));
  }, []);

  useEffect(() => {
    fetchBookedTests().then(result => setBookedTests(result));
  }, []);


  if(student != null)
  return (
    <div className="home">
      {/* <div className="sidebar">
        <LeftSide />
      </div>  */}
      <div className="homeContainer">
        <h1>Profile</h1>
      <div className="profile-container">
                
          <div key={student?.username} className="profile-card">
              <div className="left-side">
                <img src = '/icons/user_logo.png' className="profile-icon"  width="5%" height="5%"/>
              </div>
              <div className="profile-field">
                Username: {student?.username}
              </div> 
              <div className="profile-field">
                Cognome: {student?.last_name}
              </div> 
              <div className="profile-field">
                Nome: {student?.first_name}
              </div> 
              <div className="profile-field">
                Email: {student?.email}
              </div>
             </div>
          </div>
          <h1>Booked Tests</h1>
          <div className="booked_tests-container">

            {bookedtests?.map(bookedtest => (
                    <div key={bookedtest.test.test_id} className="test-card">
                        <div className="rightside">
                            <div className="test-field">
                                {"test: "+bookedtest.test.course_name+", data: "+new Date(bookedtest.test.date_time).getDay()+"/"+new Date(bookedtest.test.date_time).getMonth()+"/"+new Date(bookedtest.test.date_time).getFullYear()+" ,ora: "+new Date(bookedtest.test.date_time).getHours()+":"+new Date(bookedtest.test.date_time).getMinutes()+", score: "+bookedtest.score}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
              
        </div>
  );
 
    
}

export default MyProfile;
