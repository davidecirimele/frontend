import React, {useState,useEffect} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie"

// const baseUrl='http://127.0.0.1:8000/api/discipline/'
export const Document = () => {
    const [formData, setFormData] = useState(new FormData());
    const [id_number, setId] = useState('')
    const [type, setType] = useState('')
    const [country_of_issue, setCoi] = useState('')
    const [date_of_issue, setDoi] = useState('')
    const [date_of_expiration, setDoe] = useState('')
    const [authority_issuing_the_document, setAitd] = useState('')
    const [document_img, setDi] = useState(null)

    console.log({ id_number,type,country_of_issue,date_of_issue,date_of_expiration,authority_issuing_the_document })
    const handleId = (e) => {
      setId(e.target.value)
    }
    const handleType = (e) => {
        setType(e.target.value)
    }
    const handleCoi = (e) => {
        setCoi(e.target.value)
    }
    const handleDoi = (e) => {
        setDoi(e.target.value)
    }
    const handleDoe = (e) => {
        setDoe(e.target.value)
    }
    const handleAitd = (e) => {
        setAitd(e.target.value)
    }
    const handleDi = (e) => {
      setDi(e.target.files[0])
  }
    
    const handleFormData = () => {
      formData.append('id_number', id_number);
      formData.append('type', type);
      formData.append('country_of_issue', country_of_issue);
      formData.append('date_of_issue', date_of_issue);
      formData.append('date_of_expiration', date_of_expiration);
      formData.append('authority_issuing_the_document', authority_issuing_the_document);
      formData.append('document_img', document_img);
      setFormData(formData);
    }    
  
    const submitForm = async() => {
      try{

        const getToken = sessionStorage.getItem("token");
        
        console.log(getToken);

        console.log(sessionStorage.getItem("grade_selected"));

        const formData = new FormData();
        formData.append('id_number', id_number);
        formData.append('type', type);
        formData.append('country_of_issue', country_of_issue);
        formData.append('date_of_issue', date_of_issue);
        formData.append('date_of_expiration', date_of_expiration);
        formData.append('authority_issuing_the_document', authority_issuing_the_document);
        formData.append('document_img', document_img);
    
        
        console.log({ id_number,type,country_of_issue,date_of_issue,date_of_expiration,authority_issuing_the_document, document_img})
        handleFormData();
        await axios.post('http://127.0.0.1:8000/api/document/', 
        formData, {headers: {
          'Authorization': `Token ${getToken}`,
          'content-type': 'multipart/form-data',
          },
      }).then(result => {
        console.log(result.data)
        alert('success')
      }) 
    }
    catch(error){
      alert(error)
      console.log(error)
    }
  }

    return (
        <div className="auth-form-container">
    
          <h2>Document ID</h2>
          <h3>Please Insert your correct data below</h3>
          <form className="Discipline-form" >
    
            <label htmlFor="text" className="form-label">ID Number</label>
            <input type="text" placeholder="National ID#" name="id_number" value={id_number} onChange={handleId}/>

            <label htmlFor="text" className="form-label">Type</label>
            <input type="text" placeholder="Type" name="type" value={type} onChange={handleType}/>

            <label htmlFor="text" className="form-label">Country Of Issue</label>
            <input type="text" placeholder="Origin" name="country_of_issue" value={country_of_issue} onChange={handleCoi}/>

            <label htmlFor="text" className="form-label">Date Of Issue</label>
            <input type="text" placeholder="Issue Date" name="date_of_issue" value={date_of_issue} onChange={handleDoi}/>

            <label htmlFor="text" className="form-label">Date Of Expirations</label>
            <input type="text" placeholder="Expiry Date" name="date_of_expiration" value={date_of_expiration} onChange={handleDoe}/>

            <label htmlFor="text" className="form-label">Authority Issuing The Document</label>
            <input type="text" placeholder="Issued from which Authority" name="authority_issuing_the_document" value={authority_issuing_the_document} onChange={handleAitd}/>

            <label htmlFor="text" className="form-label">Document Image</label>
            <input type="file" name="document_img" accept="image/jpeg,image/png,image/gif" value={document_img} onChange={handleDi}/>

            <button type="button" onClick ={submitForm} >Submit </button>
          </form>
          <button className="link-btn" >Done? <NavLink to="/degree">Click here.</NavLink></button>
        </div>
      )
    }
    export default Document;
  