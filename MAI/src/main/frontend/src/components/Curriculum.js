import axios from "../api/axios";

import TableContainer from "@mui/material/TableContainer";
import {
    FormControl, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableRow
} from "@mui/material";


import TableHead from "@mui/material/TableHead";
import {useEffect, useState} from "react";

const Curriculum = () => {
    const [year, setYear] = React.useState(1);
    const [semester, setSemester] = React.useState(1);

    const [compulsoryDisciplines, setCompulsoryDisciplines] = useState([]);
    const [optionalDisciplines, setOptionalDisciplines] = useState([]);


    function fetchData() {
        axios({
            method: 'GET', url: '/api/disciplines/compulsory', auth: {
                username: localStorage.getItem('user'), password: localStorage.getItem('password')
            }, params: {
                year: year, semester: semester
            }

        }).then(response => {
            setCompulsoryDisciplines(response.data);
        }).catch(err => {
            console.log(err);
        });

        axios({
            method: 'GET', url: '/api/disciplines/optional', auth: {
                username: localStorage.getItem('user'), password: localStorage.getItem('password')
            }, params: {
                year: year, semester: semester
            }
        }).then(response => {
            setOptionalDisciplines(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    function changeYear(event) {
        setYear(event.target.value);
    }

    function changeSemester(event) {
        setSemester(event.target.value)
    }

    useEffect(() => fetchData());

    return (<div>
            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel id="select-year-label">Year</InputLabel>
                <Select labelId="select-year-label" id="year-label" value={year} label="Year" onChange={changeYear}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel id="select-semester-label">Semester</InputLabel>
                <Select labelId="select-semester-label" id="semester-label" value={semester} label="Semester"
                        onChange={changeSemester}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                </Select>
            </FormControl>


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
                            {compulsoryDisciplines.map((discipline) => (<TableRow key={discipline.name}>
                                    <TableCell>{discipline.name}</TableCell>
                                    <TableCell align="center">{discipline.noCredits}</TableCell>
                                </TableRow>))

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
                            {optionalDisciplines.map((discipline) => (<TableRow key={discipline.name}>
                                    <TableCell>{discipline.name}</TableCell>
                                    <TableCell align="center">{discipline.noCredits}</TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </div>);
}

export default Curriculum;