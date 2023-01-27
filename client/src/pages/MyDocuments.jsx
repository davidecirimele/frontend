import React from "react";
import "./MyDocuments.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

async function fetchData(){
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

const MyDocuments = () => {
  const [documents, setDocument] = useState([]);
  
  useEffect(() => {
    fetchData().then(result => setDocument(result));
  }, []);

  return (
    <div className="home">
      {/* <HeaderBar />
      <div className="homeContainer">
        <div className="sidebar-container">
            <LeftSide />
        </div>  */}
      <div className="main-content">
        <h1>this is my documents page</h1>
      </div>
      <div className="documents-container">
                {documents?.map(document => (
                    <div key={document.id_number} className="document-card">
                        <div className="left-side">
                            <img src = { document.document_img } className="document-icon"  width="20%" height="20%"/>
                        </div>
                        <div className="rightside">
                            <div className="document-type">
                                {document.type}
                            </div>  
                        </div>
                    </div>
                ))}
            </div>
    </div>
  );
}

export default MyDocuments;
