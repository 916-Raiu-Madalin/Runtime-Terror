import axios from "../api/axios";
import TableContainer from "@mui/material/TableContainer";
import {Paper, Stack, Table, TableBody, TableCell, TableRow} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import {useEffect, useState} from "react";
import DoneIcon from '@mui/icons-material/Done';
import { Button } from "@mui/material";
import {GET, POST} from "../api/requests"

const ApproveOptionals = () => {
    const [pendingDisciplines, setPendingDisciplines] = useState([]);
    function approveOptional(id){
        POST("/api/approve_optional/"+id).then(response => {
            console.log(response.data)
        }).catch(err => {
            console.log(err);
        });
        fetchData()
    }

    function fetchData() {
        axios(
            {
                method: 'GET',
                url: '/api/pending_disciplines',
                auth: {
                    username: localStorage.getItem('user'),
                    password: localStorage.getItem('password')
                },
                params: {}
            }
        ).then(response => {
            console.log(response.data)
            setPendingDisciplines(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(fetchData, []);


    return (
        <TableContainer component={Paper}>
            <Table aria-label="Pending Disciplines" title="Pending Disciplines">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={4} sx={{fontWeight: 'bold'}} align="center">Pending
                            Disciplines</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontWeight: 'bold'}}>Discipline Name</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Teacher</TableCell>
                        <TableCell align="right" sx={{fontWeight: 'bold'}}>Number of ECTS Credits</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pendingDisciplines.map((discipline) => (
                        <TableRow key={discipline.name}>
                            <TableCell>{discipline.name}</TableCell>
                            <TableCell>{discipline.teacher.name}</TableCell>
                            <TableCell align="right">{discipline.noCredits}</TableCell>
                            <TableCell align="right"><Button variant="contained" onClick={ () => { approveOptional(discipline.id)}}endIcon={<DoneIcon/>} aria-label="Approve optional">Approve</Button></TableCell>
                        </TableRow>
                    ))

                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ApproveOptionals;