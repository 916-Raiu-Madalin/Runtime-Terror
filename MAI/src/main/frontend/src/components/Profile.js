import AuthContext from "../context/AuthProvider"

import {React, useContext, useEffect, useState} from "react"
import {Grid, Paper, Avatar, TextField, Button, Box, Container, FormControlLabel, Typography} from "@mui/material"
import {POST} from "../api/requests"
import axios from "../api/axios"


const Profile=()=>{
    const {auth, setAuth} = useContext(AuthContext);
    const useMountEffect = (fun) => useEffect(fun, [])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [city, setCity] = useState('')
    
    
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
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmailAddress(response.data.emailAddress)
            setCity(response.data.city)
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleSubmit = (event) =>{
        var Buffer = require('buffer/').Buffer

        event.preventDefault();
        const data = new FormData(event.currentTarget)
        data.set('username', localStorage.getItem('user'))
        axios({
            method: 'post',
            url: '/api/profile',
            headers: { 
                'Authorization': 'Basic '+ Buffer.from(localStorage.getItem('user') + ':' + localStorage.getItem('password')).toString('base64'), 
                'Content-Type': 'multipart/form-data'
              },
            data: data
                }
            ).then(response=>
            console.log(response?.data))
        .catch(err=>
            console.log(err))
        
    }
    useMountEffect(fetchData);

    return(
        <Container component="main" maxWidth="xl">
            <Box onSubmit={handleSubmit} component="form" noValidate>   
                <TextField
                margin="normal"
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                value={firstName || ""}
                onChange={(event) => setFirstName(event.target.value)}
                autoComplete="firstname"
                autoFocus
                />
                <TextField
                margin="normal"
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                value={lastName || ""}
                onChange={(event) => setLastName(event.target.value)}
                autoComplete="lastname"
                />
                <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={emailAddress || ""}
                onChange={(event) => setEmailAddress(event.target.value)}
                autoComplete="email"
                />
                <TextField
                margin="normal"
                fullWidth
                id="cith"
                label="City"
                name="city"
                value={city || ""}
                onChange={(event) => setCity(event.target.value)}
                autoComplete="city"
                />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            >Save</Button>
            </Box>
        </Container>

    )
}

export default Profile