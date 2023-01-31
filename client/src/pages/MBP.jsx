import React, {useState,useEffect} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";




// const baseUrl='http://127.0.0.1:8000/api/discipline/'
export const MBP = () => {
    
    
    const [course_grade, setGrade] = useState('');
    console.log({course_grade});
    const handleGrade = (e) => {
      setGrade(e.target.value);
    }
  
    const submitForm = () => {
      const getToken = sessionStorage.getItem("token");
        
      console.log(getToken);
      console.log(course_grade);
      axios.post('http://127.0.0.1:8000/api/studentchoice/', {
        course_grade: course_grade,
      },{headers: {
        'Authorization': `Token ${getToken}`
        }
      }).then(result => {
        console.log(result.data);
        alert('success');
      })
        .catch(error => {
          alert('service error');
          console.log(error);
        })
    }



    // const [studentData,setstudentData] = useState({
    //     'name' : ""
    // });
    // const handleChange=(event)=>{
    //     setstudentData({
    //         ...studentData,
    //         [event.target.name]:event.target.value
    //     });
        
    // }
    // const submitForm=()=>{
    //     const studentFormData=new FormData();
    //     studentFormData.append('name', studentData.name)

    //     try{
    //         axios.post(baseUrl,studentFormData).then((response)=>{
    //             console.log(response)
    
    //         });
    //     }catch(error){
    //         console.log(error);
    //         setstudentData({'status':false})
    //     }

        
  return (
    <div className="auth-form-container">

      <h2>Discipline</h2>
      <h3>Apply for "Masters"? "Bachelors" ?"PHD" ?</h3>
      <form className="Grade-form" >

        <label htmlFor="text" className="form-label">Masters?</label>
        {/* <input type="text" placeholder="Type Masters" name="name" onChange={handleChange}/> */}
        <input type="text" placeholder="Type Masters" name="course_grade" value={course_grade} onChange={handleGrade}/>
        <button type="button" onClick ={submitForm} >Submit </button>
      </form>
      <button className="link-btn" >Done? <NavLink to="/document">Click here.</NavLink></button>
    </div>
  )
}
export default MBP;