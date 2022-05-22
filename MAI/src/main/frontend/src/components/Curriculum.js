import axios from "../api/axios";
import TableContainer from "@mui/material/TableContainer";
import {Paper, Stack, Table, TableBody, TableCell, TableRow} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import {useEffect, useState} from "react";

const Curriculum = () => {
    const [compulsoryDisciplines, setCompulsoryDisciplines] = useState([]);
    const [optionalDisciplines, setOptionalDisciplines] = useState([]);
    

    function fetchData() {
        axios(
            {
                method: 'GET',
                url: '/api/disciplines/compulsory',
                auth: {
                    username: localStorage.getItem('user'),
                    password: localStorage.getItem('password')
                },
                params: {}
            }
        ).then(response => {
            setCompulsoryDisciplines(response.data);
        }).catch(err => {
            console.log(err);
        });

        axios(
            {
                method: 'GET',
                url: '/api/disciplines/optional',
                auth: {
                    username: localStorage.getItem('user'),
                    password: localStorage.getItem('password')
                },
                params: {}
            }
        ).then(response => {
            setOptionalDisciplines(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(fetchData, []);

    return (
        <Stack direction="row" spacing={2}>
            <TableContainer component={Paper}>
                <Table aria-label="Compulsory Disciplines" title="Compulsory Disciplines">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} sx={{fontWeight: 'bold'}} align="center">Compulsory
                                Disciplines</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Discipline Name</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Number of ECTS Credits</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {compulsoryDisciplines.map((discipline) => (
                            <TableRow key={discipline.name}>
                                <TableCell>{discipline.name}</TableCell>
                                <TableCell align="center">{discipline.noCredits}</TableCell>
                            </TableRow>
                        ))

                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper}>
                <Table aria-label="Optional Disciplines">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} sx={{fontWeight: 'bold'}} align="center">Optional
                                Disciplines</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Optional Discipline Name</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Number of ECTS Credits</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {optionalDisciplines.map((discipline) => (
                            <TableRow key={discipline.name}>
                                <TableCell>{discipline.name}</TableCell>
                                <TableCell align="center">{discipline.noCredits}</TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}

export default Curriculum;