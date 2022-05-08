import AuthContext from "../context/AuthProvider"
import {React, useContext, useEffect, useState} from "react"
import { Box, Container, Button, TextField, Typography,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "../api/axios"


const Optionals = () =>{
    const [rows, setRows] = useState([]);

    const {auth, setAuth} = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('')
    const useMountEffect = (fun) => useEffect(fun, [])
    const handleSubmit = (event) => {
        event?.preventDefault();
        var Buffer = require('buffer/').Buffer
        const data = new FormData(event.currentTarget)
        console.log(data.get('discipline'))
        data.set('teacher', localStorage.getItem('user'))
        axios({
            method: 'post',
            url: '/api/add_optional',
            headers: { 
                'Authorization': 'Basic '+ Buffer.from(localStorage.getItem('user') + ':' + localStorage.getItem('password')).toString('base64'), 
                'Content-Type': 'multipart/form-data'
              },
            data: data
                }
            ).then(response=>
            setErrMsg(response?.data)
            )
        .catch(err=>
            console.log(err))
    }

    const fetchData = (event) => {
        event?.preventDefault();
        let username = localStorage.getItem('user');
        let password = localStorage.getItem('password');
        axios({
            method:'GET',
            url:'/api/get_optionals',
            auth:{
                username:username,
                password:password
            },
            params:{
                teacher:username
            }
        }).then(response =>{
            // rows=response.data;
            setRows(response.data);

        }).catch(err=>{
            console.log(err)
        })
    }
    useMountEffect(fetchData);


    return( <Container component="main" maxWidth="xl">
        <Typography component="h1" variant="h5">
            Current Optionals:
        </Typography>
        <Typography>
            {rows.map((row) => row.name + " " )}
        </Typography>

        <Box
        sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Typography component="h1" variant="h5">
              {errMsg}
          </Typography>
        </Box>
    <Box onSubmit={handleSubmit} component="form" noValidate>   
        <TextField
        margin="normal"
        required
        fullWidth
        id="discipline"
        label="Discipline Name"
        name="discipline"
        autoComplete="discipline"
        autoFocus
        />
    <Button
    type="submit"
    fullWidth
    variant="contained"
    >Save</Button>
    </Box>
</Container>)
}

export default Optionals