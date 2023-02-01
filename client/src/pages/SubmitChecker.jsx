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
    const [bookedtests, setBookedTests] = useState([])
    const [studentsenrolled, setStudentsEnrolled] = useState([])
    const [settedscore, setScore] = useState('')

    let { username } = useParams()
    
    const handleScore = (e) => {
        setScore(e.target.value)
    }
    


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

    useEffect(() => {
        async function fetchData() {
            const getToken = sessionStorage.getItem("token");
            const testsforuser = [];
            const bookedtests = await axios.get('http://127.0.0.1:8000/api/booked_test/', {
                headers: {
                    'Authorization': `Token ${getToken}`,
                },
            });
            bookedtests.data.forEach(test => {
                if(test.student === username)
                    testsforuser.push(test)
            });
            setBookedTests(testsforuser);
        }
        fetchData()
    }, []);

    useEffect(() => {
        async function fetchData() {
            const getToken = sessionStorage.getItem("token");
            const students = await axios.get('http://127.0.0.1:8000/api/student_enrolled/', {
                headers: {
                    'Authorization': `Token ${getToken}`,
                },
            });
            setStudentsEnrolled(students.data);
        }
        fetchData()
    }, []);

    async function submitScore(test_id,id){
        const getToken = sessionStorage.getItem("token");
        await axios.put('http://127.0.0.1:8000/api/booked_test/'+id, {
            test_id : test_id,
            test : test_id,
            score : settedscore,
        },{
                headers: {
                    'Authorization': `Token ${getToken}`,
                },
        }).then(result => {
            alert("score setted succesfully");
        }).catch(error => {
            alert("Something went wrong");
        });
    }

    if (!user) {
        return <div>Loading...</div>
    }
    else if(studentsenrolled.some(student => student.student.username === username))
    return (
        <div className="checker-container">
            <NavigationBar />


            <div className="checker-header">

                <a className="back" href="../"> ← Back to list</a>
                <div className="submit-id">Student - {user && user.username}</div>

            </div>
            <div className="checker-body">
                <div className="document-checker">
                    <div className="id-checker">
                        <div className="student-status">Student status: </div>
                        <div className="green">enrolled</div>
                        <ArticleIcon className="article-icon" />
                        <div className="doc-status">Document status: </div>
                        {document ? <div className="green">uploaded</div> : <div className="red">not uploaded</div>}
                    </div>
                    
                </div>
            </div>
            <div className="table-bg">
                <div className="text-table">
                    Student Info
                </div>
                <TableContainer className="table-container" sx={{ borderRadius: "5px" }}>
                    <Table sx={{ minWidth: 650, backgroundColor: "#232323" }} aria-label="simple table">
                        <TableHead className="sticky">
                            <TableRow sx={{ position: "sticky", }}>
                                <TableCell sx={{ color: "white", lineHeight: 2, fontWeight: 500, fontSize: 15 }} align="center">Number ID</TableCell>
                                <TableCell sx={{ color: "white", lineHeight: 2, fontWeight: 500, fontSize: 15 }} align="center">Department</TableCell>
                                <TableCell sx={{ color: "white", lineHeight: 2, fontWeight: 500, fontSize: 15 }} align="center">Course</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                studentsenrolled.map((student) => {
                                    if(student.student.username === username)
                                    {
                                        return (
                                        <TableRow
                                        key={student.id_number}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell sx={{ color: "white", lineHeight: 3 }} align="center">{student.id_number}</TableCell>
                                        <TableCell sx={{ color: "white" }} component="th" scope="row" align="center">
                                            {student.department}
                                        </TableCell>
                                        <TableCell sx={{ color: "white", lineHeight: 3 }} align="center">{student.course}</TableCell>
                                        </TableRow>
                                        )
                                    }
                                    }
                                )
                         }
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    );
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
                        <div className="student-status">Student status: </div>
                        <div className="red">Not enrolled</div>
                    </div>
                    
                </div>
                <div className="id-images">
                        <img src="/icons/id.png" className="id-icon"/>
                    </div>
            </div>
            <div className="table-bg">
                <div className="text-table">
                    Resuming student appliances
                </div>
                <TableContainer className="table-container" sx={{ borderRadius: "5px" }}>
                    <Table sx={{ minWidth: 650, backgroundColor: "#232323" }} aria-label="simple table">
                        <TableHead className="sticky">
                            <TableRow sx={{ position: "sticky", }}>
                                <TableCell sx={{ color: "white", lineHeight: 2, fontWeight: 500, fontSize: 15 }} align="center">Test</TableCell>
                                <TableCell sx={{ color: "white", lineHeight: 2, fontWeight: 500, fontSize: 15 }} align="center">Exam Date</TableCell>
                                <TableCell sx={{ color: "white", lineHeight: 2, fontWeight: 500, fontSize: 15 }} align="center">Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookedtests.map((registration) => (

                                <TableRow
                                    key={registration.student.username}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ color: "white" }} component="th" scope="row" align="center">
                                        {registration.test.course_name}
                                    </TableCell>
                                    <TableCell sx={{ color: "white", lineHeight: 3 }} align="center">{registration.test.date_time}</TableCell>
                                    <TableCell sx={{ color: "white", lineHeight: 3 }} align="center">{registration.score}</TableCell>
                                    <TableCell sx={{ color: "white", lineHeight: 3 }} align="center">
                                        <input type = "text" placeholder="set score" name="score" onChange={handleScore}></input>
                                    </TableCell>
                                    <TableCell sx={{ color: "white", lineHeight: 3 }} align="center">
                                        <button type = "button" onClick={() => {submitScore(registration.test_id,registration.id,registration)}}>Submit</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    );
}

export default SubmitChecker


