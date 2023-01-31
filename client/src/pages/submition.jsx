import { TextField } from "@mui/material";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import NavigationBar from '../components/navigationBar';
import ArticleIcon from '@mui/icons-material/Article';
import axios from "axios";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registrations from './appliances.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import './submition.css';



function Submition(props) {

    return (
       <div className="align">
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
    );
}

export default Submition;


