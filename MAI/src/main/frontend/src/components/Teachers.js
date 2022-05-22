
import axios from "../api/axios";
import TableContainer from "@mui/material/TableContainer";
import {Paper, Stack, Table, TableBody, TableCell, TableRow} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import {React, useEffect, useState} from "react";

const Teachers = () => {


    const [rows, setRows] = useState([])
    const fetchData = (event) => {
        event?.preventDefault();
        let username = localStorage.getItem("user");
        let password = localStorage.getItem("password");
        axios({
            method: "GET",
            url: "/api/get_disciplines_all/",
            auth: {
                username: username,
                password: password,
            }
        })
            .then((response) => {
                setRows(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const useMountEffect = (fun) => useEffect(fun, [])
    useMountEffect(fetchData);

    return (
        <Stack sx={{marginTop:4}} component={Paper} direction="row" spacing={10} maxWidth={800} marginLeft={"auto"} marginRight={"auto"}>

            {Object.keys(rows).map(row => (
                <TableContainer >
                    <Table aria-label={row.name} title={row.name}>

                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}} align="left">
                                    Teacher Name:</TableCell>
                                <TableCell
                                    colSpan={2}
                                    sx={{fontWeight: "bold"}}
                                    align="center"
                                > {row}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell  sx={{fontWeight: 'bold'}} align="left">
                                    Discipline Name
                                </TableCell>
                                <TableCell  sx={{fontWeight: 'bold'}} align="center">
                                    Semester
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows[row].map((discipline) => (
                                <TableRow
                                    key={discipline.name}
                                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                >
                                    <TableCell  component="th" scope="row" >
                                        {discipline.name}
                                    </TableCell>
                                    <TableCell  component="th" scope="row"sx={{fontWeight: 'bold'}} align="center">
                                        {discipline.semester}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
        </Stack>
    )
}

export default Teachers;