import React, {useState} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";


export const Studentenrolled = () => {

    const [course_selected, setCourse_selected] = useState('')
    console.log({ course_selected })

    const handleCourse_selected = (e) => {
      setCourse_selected(e.target.value)
    }

    const submitForm = () => {
      
      axios.put('http://127.0.0.1:8000/api/studentenrolled/', {
        course_selected: course_selected,
      }).then(result => {
        console.log(result.data)
        alert('success')

      })
        .catch(error => {
          alert('service error')
          console.log(error)
        })
    }


        
  return (
    <div className="auth-form-container">

      <h2>Program Select</h2>
      <h3>for example "AI','CHEMISTRY'...</h3>
      <form className="Discipline-form" >

        <label htmlFor="text" className="form-label">Enter Program</label>
        <input type="text" placeholder="Which Programme you want to choose" name="course_selected" value={course_selected} onChange={handleCourse_selected}/>

        <button type="submit" onClick ={submitForm} >Submit </button>
      </form>
      <button className="link-btn" >Done? <NavLink to="/homepage">Click here.</NavLink></button>
    </div>
  )
}
export default Studentenrolled;