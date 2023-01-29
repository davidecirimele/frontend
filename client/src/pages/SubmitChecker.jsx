import "./submitChecker.css";
import { TextField } from "@mui/material";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import NavigationBar from '../components/navigationBar';
import ArticleIcon from '@mui/icons-material/Article';
import axios from "axios";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Registrations from './appliances.json';




function SubmitChecker(props) {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null);
    const [document, setDocument] = useState(null);

    let { username } = useParams()


    useEffect(() => {
        async function fetchData() {
            const getToken = sessionStorage.getItem("token");
            const students = await axios.get('http://127.0.0.1:8000/api/student/', {
                headers: {
                    'Authorization': `Token ${getToken}`,
                },
            });
            setUsers(students.data);
        }
        fetchData()
    }, []);

    useEffect(() => {
        if (username && users.length > 0) {
            setUser(users.find(user => user.username === username));
        }
    }, [users, username])

    useEffect(() => {
        async function fetchData() {
            if (username) {
                const getToken = sessionStorage.getItem("token");
                const response = await axios.get(`http://127.0.0.1:8000/api/document/`, {
                    headers: {
                        'Authorization': `Token ${getToken}`,
                    },
                });
                setDocument(response.data.find(document => document.owner === username));
            }
        }
        fetchData();
    }, [document, username]);

    if (!user) {
        return <div>Loading...</div>
    }
    else
        return (
            <div className="checker-container">
                <NavigationBar />


                <div className="checker-header">

                    <a className="back" href="../"> ← Back to list</a>
                    <div className="submit-id">Submition - {user && user.username}</div>

                </div>
                <div className="checker-body">
                    <div className="document-checker">
                        <div className="id-checker">
                            <ArticleIcon className="article-icon" />
                            <div className="doc-status">Document status: </div>
                            {document ? <div className="green">uploaded</div> : <div className="red">not uploaded</div>}
                        </div>
                    </div>
                </div>
                <div className="appliances-table">
                    <TableContainer className="table-container" sx={{ borderRadius: "5px" }}>
                        <Table sx={{ minWidth: 650, backgroundColor: "#232323" }} aria-label="simple table">
                            <TableHead className="sticky">
                                <TableRow sx={{ position: "sticky", }}>
                                    <TableCell sx={{ color: "white", lineHeight: 2, fontWeight: 700, fontSize: 15 }} align="left">Subject</TableCell>
                                    <TableCell sx={{ color: "white", lineHeight: 2, fontWeight: 700, fontSize: 15 }} align="left">Professor</TableCell>
                                    <TableCell sx={{ color: "white", lineHeight: 2, fontWeight: 700, fontSize: 15 }} align="left">Registration Date</TableCell>
                                    <TableCell sx={{ color: "white", lineHeight: 2, fontWeight: 700, fontSize: 15 }} align="left">Exam Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Registrations.map((registration) => (

                                    <TableRow
                                        key={registration.subject}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{ color: "white" }} component="th" scope="row">
                                            {registration.subject}
                                        </TableCell>
                                        <TableCell sx={{ color: "white", lineHeight: 4 }} align="left">{registration.prof}</TableCell>
                                        <TableCell sx={{ color: "white", lineHeight: 4 }} align="left">{registration.registration_date}</TableCell>
                                        <TableCell sx={{ color: "white", lineHeight: 4 }} align="left">{registration.exam_date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div >
        );
}

export default SubmitChecker


