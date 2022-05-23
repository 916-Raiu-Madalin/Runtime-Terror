import axios from "../api/axios";
import TableContainer from "@mui/material/TableContainer";
import {Container, Button, Paper, Stack, Table, TableBody, Box, TableCell, TableRow} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import {React, useEffect, useState} from "react";

const Contract = () => {
    const [compulsoryDisciplines, setCompulsoryDisciplines] = useState([]);
    const [optionalDisciplines, setOptionalDisciplines] = useState([]);


    function fetchData() {
        axios(
            {
                method: 'GET',
                url: '/api/courses',
                auth: {
                    username: localStorage.getItem('user'),
                    password: localStorage.getItem('password')
                },
                params: {
                    username:localStorage.getItem('user'),
                }
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

    const handleSubmit = (event) => {
        var Buffer = require('buffer/').Buffer

        event.preventDefault();
        const data = new FormData(event.currentTarget)
        data.set('username', localStorage.getItem('user'))
        axios({
            method: 'post', url: '/api/courses', headers: {
                'Authorization': 'Basic ' + Buffer.from(localStorage.getItem('user') + ':' + localStorage.getItem('password')).toString('base64'),
                'Content-Type': 'multipart/form-data'
            },
            data: data,
            course_name: compulsoryDisciplines[0].name
        }).then(response => console.log(response?.data))
            .catch(err => console.log(err))

    }
    useEffect(fetchData, []);

    return (
        <Container component="main" maxWidth="xl">
            <Box onSubmit={handleSubmit} component="form" noValidate>
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
                                <TableRow key={discipline.course.name}>
                                    <TableCell>{discipline.course.name}</TableCell>
                                    <TableCell align="center">{discipline.course.noCredits}</TableCell>
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
                                    <TableCell> <input type="checkbox"/> </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>

            <Button
                type="submit"
                fullWidth
                variant="contained"
            >Sign Contract</Button>
            </Box>
        </Container>
    );
}

export default Contract;