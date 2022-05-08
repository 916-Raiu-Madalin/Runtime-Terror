import AuthContext from "../context/AuthProvider"
import {React, useContext, useEffect, useState} from "react"
import { Box, Container, Button, TextField, Typography } from "@mui/material"
import axios from "../api/axios"


const Optionals = () =>{
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



    return( <Container component="main" maxWidth="xl">
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