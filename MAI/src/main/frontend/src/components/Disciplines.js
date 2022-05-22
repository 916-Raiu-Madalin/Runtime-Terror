import {Box, Paper, TableSortLabel} from "@mui/material";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "../api/axios";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthProvider";

// function createData(
//     name: string,
//     grade:number,
//
// ) {
//     return { name, grade };
// }
//
// const rows = [
//     createData('Frozen yoghurt', 159),
//     createData('Ice cream sandwich', 237),
//     createData('Eclair', 262),
//     createData('Cupcake', 305),
//     createData('Gingerbread', 356),
// ];
const Disciplines=()=>{

    // let rows=[];
    const [rows, setRows] = useState([]);
    const [orderDirection, setOrderDirection] = useState("asc");
    const {auth, setAuth} = useContext(AuthContext);
    const useMountEffect = (fun) => useEffect(fun, [])

    const sortArray = (arr, orderBy) => {
        switch (orderBy) {
            case "asc":
            default:
                return arr.sort((a, b) =>
                    a.course.semester > b.course.semester ? 1 : b.course.semester > a.course.semester ? -1 : 0
                );
            case "desc":
                return arr.sort((a, b) =>
                    a.course.semester < b.course.semester ? 1 : b.course.semester < a.course.semester ? -1 : 0
                );
        }
    };

    const handleSortRequest = () => {
        setRows(sortArray(rows, orderDirection));
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };
    const fetchData = (event) =>{

        event?.preventDefault();
        const loggedIn = auth?.logged_in ? true : false
        let username = localStorage.getItem('user');
        let password = localStorage.getItem('password');
        axios({
            method:'GET',
            url:'/api/courses',
            auth:{
                username:username,
                password:password
            },
            params:{
                username:username
            }
        }).then(response =>{
            // rows=response.data;
            console.log(response.data)
            setRows(response.data);

        }).catch(err=>{
            console.log(err)
        })
    }
    useMountEffect(fetchData);

    return(

        <TableContainer >
            <Table sx={{ minWidth: "auto" ,maxWidth:860, marginTop:5,marginLeft:"auto",marginRight:"auto"}} aria-label="Disciplines">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Discipline Name</b></TableCell>

                        <TableCell align="right"><b>Grade</b></TableCell>
                        <TableCell align="right" onClick={handleSortRequest}>
                            <TableSortLabel active={true} direction ={orderDirection}>
                                <b>Semester</b>
                            </TableSortLabel>


                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.course.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <b>{row.course.name}</b>
                            </TableCell>
                            <TableCell align="right">{row.grade}</TableCell>
                            <TableCell align ="right">{row.course.semester}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default Disciplines;