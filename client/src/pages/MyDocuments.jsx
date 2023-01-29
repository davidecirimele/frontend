import React from "react";
import "./MyDocuments.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { color } from "@mui/system";


async function fetchDocuments(){
  const getToken = sessionStorage.getItem("token");
    const documents = [];
     await axios.get('http://127.0.0.1:8000/api/document/', {headers: {
      'Authorization': `Token ${getToken}`,
      },
    }).then(result => {
    console.log(result.data);
    result.data.forEach(document => {
      documents.push(document);
    });
    })
    return documents;
}

async function fetchDegrees(){
  const getToken = sessionStorage.getItem("token");
    const degrees = [];
     await axios.get('http://127.0.0.1:8000/api/degree/', {headers: {
      'Authorization': `Token ${getToken}`,
      },
    }).then(result => {
    console.log(result.data);
    result.data.forEach(degree => {
      degrees.push(degree);
    });
    })
    return degrees;
}

function checkValidity(document){
  const currentDate = new Date();
  const expirationDate = new Date(document.date_of_expiration);

  if (currentDate <= expirationDate) {
    return true
  } else {
    return false
  }
}

function addDocument(){
  window.location.href = '/document';
}

function addQualification(){
  window.location.href = '/degree';
}

const MyDocuments = () => {
  const [documents, setDocument] = useState([]);
  const [degrees, setDegree] = useState([]);
  
  
  useEffect(() => {
    fetchDocuments().then(result => setDocument(result));
  }, []);
  useEffect(() => {
    fetchDegrees().then(result => setDegree(result));
  }, []);



  return (
    <div className="home">
      {/* <HeaderBar />
      <div className="homeContainer">
        <div className="sidebar-container">
            <LeftSide />
        </div>  */}
      <div className="main-content">
        <h1>My Documents</h1>
      </div>
      <div className = "button-div">
        <button type="button" onClick = {addDocument}>Add a Document</button>
        <button type="button" onClick = {addQualification}>Add a Qualification</button>
      </div>
      <div className="title-content">
        <h1>ID Documents</h1>
      </div>
      <div className="documents-container">
                {documents?.map(document => (
                    <div key={document.id_number} className="document-card">
                        <div className="left-side">
                            <img src = { document.document_img } className="document-icon"  width="20%" height="20%" alt='icons/document_icon.png'/>
                        </div>
                        <div className="rightside">
                            <div className="document-type">
                                Document: {document.type}
                            </div> 
                            <div className="document-number">
                                Id Number: {document.id_number}
                            </div> 
                            {checkValidity(document)?<div className="green">valid</div> : <div className="red">expired</div>}
                        </div>
                    </div>
                ))}
            </div>
          <div className="title-content">
            <h1>Qualifications</h1>
          </div>
          <div className="degree-container">
                {degrees?.map(degree => (
                    <div key={degree.discipline} className="degree-card">
                        <div className="left-side">
                            <img src = '/icons/degree.png' className="degree-icon"  width="20%" height="20%" />
                        </div>
                        <div className="rightside">
                            <div className="degree-type">
                                Grade: {degree.type_of_degree}
                            </div> 
                            <div className="degree-discipline">
                                Discipline: {degree.discipline}
                            </div> 
                        </div>
                    </div>
                ))}
            </div>
    </div>
    
  );
}

export default MyDocuments;
