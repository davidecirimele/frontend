import "./submitChecker.css";
import { TextField } from "@mui/material";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import Users from './users.json';
import NavigationBar from '../components/navigationBar';
import ArticleIcon from '@mui/icons-material/Article';


function SubmitChecker(props) {
    const [user, setUser] = useState("")
    let { id } = useParams()
    console.log({ user })

    useEffect(() => {
        setUser(Users.find(user => user.id === id))
    }, []);

    return (
        <div className="checker-container">
            <NavigationBar />
            

            <div className="checker-header">
                
            <a className="back" href="../"> ← Back to list</a>
            <div className="submit-id">Submition - {user.name}</div>
                
            </div>
            <div className="checker-body">
                <div className="document-checker">
                    <div className="id-checker">
                        <ArticleIcon className="article-icon"/>
                        <div className="doc-status">Document status: </div>
                        {user.document == "true" ?<div className="green">uploaded</div> : <div className="red">not uploaded</div>}
                    </div>
                </div>

            </div>
        </div >
    );
}
export default SubmitChecker;
