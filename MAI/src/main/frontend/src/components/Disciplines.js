import {Box, Paper} from "@mui/material";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "../api/axios";
import {useContext} from "react";
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

    let rows=[];
    const {auth, setAuth} = useContext(AuthContext);

    const fetchData = (event) =>{

        event?.preventDefault();
        const loggedIn = auth?.logged_in ? true : false
        let username = localStorage.getItem('user');
        let password = localStorage.getItem('password');
        axios({
            method:'GET',
            url:'/api/profile',
            auth:{
                username:username,
                password:password
            },
            params:{
                username:username
            }
        }).then(response =>{
            rows=response.data.registers;
        }).catch(err=>{
            console.log(err)
        })
    }
    return(

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 ,maxWidth:860, marginTop:5,marginLeft:"auto",marginRight:"auto"}} aria-label="Disciplines">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Discipline Name</b></TableCell>
                        <TableCell align="right"><b>Grade</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.grade}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default Disciplines;